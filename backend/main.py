from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse
import os
import sys
import tempfile
from pathlib import Path

# 添加当前目录到Python路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.text_to_ppt import TextToPPTService
from services.ppt_to_video import PPTToVideoService

# 尝试导入AI增强服务（如果配置了AI服务）
try:
    from dotenv import load_dotenv
    load_dotenv()
    
    enable_ai = os.getenv("ENABLE_AI_ENHANCEMENT", "false").lower() == "true"
    
    if enable_ai:
        from services.text_to_ppt_ai import AITextToPPTService
        from services.ppt_to_video_ai import AIPTTToVideoService
        ai_provider = os.getenv("AI_PROVIDER", "baidu")
        
        # 使用AI增强服务
        text_to_ppt_service = AITextToPPTService(ai_provider=ai_provider)
        ppt_to_video_service = AIPTTToVideoService(
            tts_provider=ai_provider,
            avatar_provider="tencent"
        )
        print("[INFO] AI增强服务已启用")
    else:
        # 使用基础服务
        text_to_ppt_service = TextToPPTService()
        ppt_to_video_service = PPTToVideoService()
        print("[INFO] 使用基础服务（未启用AI）")
except Exception as e:
    # 如果AI服务导入失败，使用基础服务
    print(f"[WARN] AI服务未配置或导入失败，使用基础服务: {str(e)}")
    text_to_ppt_service = TextToPPTService()
    ppt_to_video_service = PPTToVideoService()

app = FastAPI(title="教材制作API", version="1.0.0")

# 配置CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 确保临时目录存在
TEMP_DIR = Path("temp")
TEMP_DIR.mkdir(exist_ok=True)


@app.get("/")
async def root():
    return {"message": "教材制作API服务", "status": "running"}


@app.post("/api/text-to-ppt")
async def text_to_ppt(text: str = Form(...)):
    """
    文本转PPT接口
    """
    try:
        if not text or not text.strip():
            raise HTTPException(status_code=400, detail="文本内容不能为空")
        
        # 生成PPT
        ppt_path = await text_to_ppt_service.generate_ppt(text)
        
        # 返回文件
        return FileResponse(
            ppt_path,
            media_type="application/vnd.openxmlformats-officedocument.presentationml.presentation",
            filename="presentation.pptx"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"生成PPT失败: {str(e)}")


@app.post("/api/ppt-to-video")
async def ppt_to_video(
    file: UploadFile = File(...),
    ai_avatar_enabled: str = Form("true")
):
    """
    PPT转视频接口
    """
    tmp_ppt_path = None
    try:
        import traceback
        # 保存上传的PPT文件
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pptx") as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_ppt_path = tmp_file.name
        
        # 转换为视频
        ai_enabled = ai_avatar_enabled.lower() == "true"
        video_path = await ppt_to_video_service.convert_to_video(
            tmp_ppt_path,
            ai_avatar_enabled=ai_enabled
        )
        
        # 清理临时PPT文件
        if tmp_ppt_path and os.path.exists(tmp_ppt_path):
            os.unlink(tmp_ppt_path)
        
        # 返回视频文件
        return FileResponse(
            video_path,
            media_type="video/mp4",
            filename="presentation.mp4"
        )
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        error_msg = f"PPT转视频错误: {str(e)}"
        print(error_msg)
        print(f"错误堆栈: {error_trace}")
        
        # 将错误写入日志文件
        try:
            with open("backend-error.log", "a", encoding="utf-8") as log_file:
                log_file.write(f"\n{'='*50}\n")
                log_file.write(f"时间: {__import__('datetime').datetime.now()}\n")
                log_file.write(f"{error_msg}\n")
                log_file.write(f"{error_trace}\n")
        except:
            pass
        
        # 清理临时文件
        if tmp_ppt_path and os.path.exists(tmp_ppt_path):
            try:
                os.unlink(tmp_ppt_path)
            except:
                pass
        raise HTTPException(status_code=500, detail=f"生成视频失败: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

