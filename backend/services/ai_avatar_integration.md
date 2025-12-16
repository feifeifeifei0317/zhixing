# AI数字形象集成指南

本文档说明如何集成真实的AI数字人服务到教材制作系统中。

## 支持的AI数字人服务商

### 1. 腾讯云数字人
- 官网：https://cloud.tencent.com/product/dh
- API文档：https://cloud.tencent.com/document/product/1147

### 2. 阿里云数字人
- 官网：https://www.aliyun.com/product/digital-human
- API文档：https://help.aliyun.com/product/155913.html

### 3. 百度智能云数字人
- 官网：https://cloud.baidu.com/product/digital-human.html
- API文档：https://cloud.baidu.com/doc/DH/s/

### 4. 开源方案 - SadTalker
- GitHub：https://github.com/OpenTalker/SadTalker
- 可以本地部署，无需API密钥

## 集成步骤示例（以腾讯云为例）

### 1. 安装SDK

```bash
pip install tencentcloud-sdk-python
```

### 2. 修改 `ppt_to_video.py`

在 `_add_ai_avatar` 方法中添加以下代码：

```python
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.dh.v20230418 import dh_client, models

def _add_ai_avatar(self, video_clip):
    """
    添加AI数字形象到视频中（腾讯云实现示例）
    """
    # 1. 初始化腾讯云客户端
    cred = credential.Credential("your-secret-id", "your-secret-key")
    httpProfile = HttpProfile()
    httpProfile.endpoint = "dh.tencentcloudapi.com"
    
    clientProfile = ClientProfile()
    clientProfile.httpProfile = httpProfile
    client = dh_client.DhClient(cred, "ap-beijing", clientProfile)
    
    # 2. 提取PPT文本内容
    text_content = self._extract_text_from_ppt()
    
    # 3. 调用TTS服务生成语音
    tts_audio = self._generate_tts(text_content)
    
    # 4. 调用数字人服务生成视频
    req = models.CreateDigitalHumanVideoRequest()
    req.Text = text_content
    req.AudioUrl = tts_audio
    req.AvatarId = "your-avatar-id"
    
    resp = client.CreateDigitalHumanVideo(req)
    
    # 5. 下载数字人视频
    avatar_video_path = self._download_video(resp.VideoUrl)
    
    # 6. 合成数字人视频和PPT视频
    avatar_clip = VideoFileClip(avatar_video_path)
    final_video = CompositeVideoClip([video_clip, avatar_clip])
    
    return final_video
```

## TTS（文本转语音）集成

### 使用Azure TTS示例

```python
import azure.cognitiveservices.speech as speechsdk

def _generate_tts(self, text: str) -> str:
    """使用Azure TTS生成语音"""
    speech_config = speechsdk.SpeechConfig(
        subscription="your-azure-key",
        region="your-region"
    )
    speech_config.speech_synthesis_voice_name = "zh-CN-XiaoxiaoNeural"
    
    synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
    result = synthesizer.speak_text_async(text).get()
    
    # 保存音频文件
    audio_path = self.temp_dir / "tts_audio.wav"
    with open(audio_path, "wb") as f:
        f.write(result.audio_data)
    
    return str(audio_path)
```

## 本地部署方案（SadTalker）

如果不想使用云服务，可以使用开源的SadTalker：

```python
import subprocess
import os

def _add_ai_avatar_local(self, video_clip):
    """使用SadTalker本地生成数字人视频"""
    # 1. 提取PPT文本
    text = self._extract_text_from_ppt()
    
    # 2. 生成TTS音频
    audio_path = self._generate_tts_local(text)
    
    # 3. 准备数字人图片（需要预先准备）
    avatar_image = "path/to/avatar/image.jpg"
    
    # 4. 调用SadTalker生成视频
    output_path = self.temp_dir / "avatar_video.mp4"
    cmd = [
        "python", "SadTalker/inference.py",
        "--driven_audio", str(audio_path),
        "--source_image", avatar_image,
        "--result_dir", str(self.temp_dir)
    ]
    subprocess.run(cmd)
    
    # 5. 合成视频
    avatar_clip = VideoFileClip(str(output_path))
    final_video = CompositeVideoClip([video_clip, avatar_clip])
    
    return final_video
```

## 注意事项

1. **API密钥管理**：建议使用环境变量存储API密钥，不要硬编码
2. **成本控制**：数字人服务通常按使用量收费，注意控制成本
3. **视频质量**：根据需求选择合适的视频分辨率和质量
4. **处理时间**：数字人视频生成可能需要较长时间，考虑异步处理
5. **错误处理**：添加完善的错误处理和重试机制

## 环境变量配置示例

创建 `.env` 文件：

```env
# 腾讯云配置
TENCENT_SECRET_ID=your-secret-id
TENCENT_SECRET_KEY=your-secret-key
TENCENT_REGION=ap-beijing

# Azure TTS配置
AZURE_SPEECH_KEY=your-azure-key
AZURE_SPEECH_REGION=your-region

# 数字人配置
AVATAR_ID=your-avatar-id
AVATAR_ENABLED=true
```










