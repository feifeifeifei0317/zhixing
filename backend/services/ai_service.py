"""
AI服务集成模块
支持多种AI服务提供商的集成
"""
import os
from typing import Optional, Dict, Any
from pathlib import Path
import json


class AIService:
    """AI服务基类"""
    
    def __init__(self):
        self.temp_dir = Path("temp")
        self.temp_dir.mkdir(exist_ok=True)
    
    def load_config(self) -> Dict[str, str]:
        """从环境变量加载配置"""
        config = {}
        # 这里可以从.env文件或环境变量读取
        return config


class LLMService(AIService):
    """大语言模型服务 - 用于文本转PPT增强"""
    
    def __init__(self, provider: str = "baidu"):
        super().__init__()
        self.provider = provider
        self.config = self.load_config()
    
    async def enhance_text_to_ppt(self, text: str) -> Dict[str, Any]:
        """
        使用AI增强文本转PPT
        返回优化后的PPT结构建议
        """
        if self.provider == "baidu":
            return await self._baidu_enhance(text)
        elif self.provider == "openai":
            return await self._openai_enhance(text)
        else:
            # 默认返回原始结构
            return {"sections": self._parse_basic_structure(text)}
    
    async def _baidu_enhance(self, text: str) -> Dict[str, Any]:
        """使用百度文心一言增强"""
        try:
            import requests
            import json
            
            # 从环境变量获取配置
            api_key = os.getenv("BAIDU_WENXIN_API_KEY", "").strip()
            secret_key = os.getenv("BAIDU_WENXIN_SECRET_KEY", "").strip()
            
            # 如果API KEY格式包含路径，尝试提取
            if api_key.startswith("bce-v3/"):
                # 格式可能是：bce-v3/ALTAK-xxx/xxx
                # 需要从百度控制台获取正确的API Key和Secret Key
                print("[WARN] API KEY格式可能不正确，请确认从百度控制台获取的是API Key和Secret Key")
                # 尝试使用提供的值作为完整凭证
                if not secret_key:
                    # 如果没有Secret Key，尝试解析API KEY
                    parts = api_key.split("/")
                    if len(parts) >= 3:
                        # 可能是完整凭证，需要查看百度文档确认格式
                        print(f"检测到特殊格式的API KEY，请确认是否正确")
            
            if not api_key:
                raise ValueError("百度文心一言API Key未配置")
            
            # 如果提供了Secret Key，使用标准方式获取access_token
            if secret_key:
                # 获取Access Token
                auth_url = 'https://aip.baidubce.com/oauth/2.0/token'
                auth_params = {
                    'grant_type': 'client_credentials',
                    'client_id': api_key,
                    'client_secret': secret_key
                }
                auth_response = requests.post(auth_url, params=auth_params)
                auth_result = auth_response.json()
                
                if 'error' in auth_result:
                    raise ValueError(f"获取Access Token失败: {auth_result.get('error_description', '未知错误')}")
                
                access_token = auth_result.get('access_token')
                if not access_token:
                    raise ValueError("未能获取Access Token")
            else:
                # 如果没有Secret Key，尝试直接使用API KEY（可能需要根据实际格式调整）
                print("[WARN] 未提供Secret Key，尝试直接使用API KEY")
                access_token = api_key
            
            # 限制文本长度，避免超出API限制（百度文心一言通常限制4000字符）
            max_text_length = 3000
            if len(text) > max_text_length:
                print(f"[WARN] 文本长度 {len(text)} 超过限制，将截取前 {max_text_length} 字符")
                text = text[:max_text_length] + "..."
            
            # 构建提示词
            prompt = f"""请分析以下课程文本，生成一个结构化的PPT大纲。
要求：
1. 提取所有主要章节和要点（不要遗漏任何内容）
2. 为每个章节生成合适的标题
3. 为每个要点生成简洁的描述
4. 确保包含所有重要内容
5. 返回JSON格式的结构

文本内容：
{text}

请返回JSON格式，包含以下字段：
- title: 课程标题
- sections: 章节列表，每个章节包含title和points字段（points是字符串数组）

只返回JSON，不要其他文字说明。示例格式：
{{
  "title": "课程标题",
  "sections": [
    {{
      "title": "第一章标题",
      "points": ["要点1", "要点2", "要点3"]
    }},
    {{
      "title": "第二章标题",
      "points": ["要点1", "要点2"]
    }}
  ]
}}"""
            
            # 调用百度文心一言API
            api_url = f'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token={access_token}'
            headers = {'Content-Type': 'application/json'}
            data = {
                'messages': [
                    {
                        'role': 'user',
                        'content': prompt
                    }
                ],
                'temperature': 0.7,
                'max_output_tokens': 4000  # 增加输出token限制
            }
            
            response = requests.post(api_url, headers=headers, data=json.dumps(data))
            result = response.json()
            
            if 'error' in result:
                error_msg = result.get('error_description', result.get('error', '未知错误'))
                raise ValueError(f"百度文心一言API调用失败: {error_msg}")
            
            # 解析返回结果
            content = result.get('result', '')
            if not content:
                raise ValueError("API返回结果为空")
            
            # 尝试解析JSON
            try:
                # 提取JSON部分
                import re
                json_match = re.search(r'\{.*\}', content, re.DOTALL)
                if json_match:
                    parsed_result = json.loads(json_match.group())
                    print(f"[INFO] AI返回结构解析成功，包含 {len(parsed_result.get('sections', []))} 个章节")
                    # 验证结构
                    if 'sections' in parsed_result and isinstance(parsed_result['sections'], list):
                        total_points = sum(len(s.get('points', [])) for s in parsed_result['sections'])
                        print(f"[INFO] 共 {total_points} 个要点")
                    return parsed_result
                else:
                    # 如果不是JSON，尝试直接解析
                    parsed_result = json.loads(content)
                    print(f"[INFO] AI返回结构解析成功（直接解析）")
                    return parsed_result
            except json.JSONDecodeError as e:
                # 如果无法解析JSON，使用基础解析
                print(f"[WARN] API返回的不是标准JSON格式，使用基础解析")
                print(f"API返回内容预览: {content[:200]}")
                print(f"JSON解析错误: {str(e)}")
                return {"sections": self._parse_basic_structure(text)}
            
        except Exception as e:
            print(f"百度AI服务调用失败: {str(e)}")
            import traceback
            traceback.print_exc()
            # 失败时使用基础解析
            return {"sections": self._parse_basic_structure(text)}
    
    async def _openai_enhance(self, text: str) -> Dict[str, Any]:
        """使用OpenAI GPT增强"""
        try:
            import openai
            
            api_key = os.getenv("OPENAI_API_KEY")
            if not api_key:
                raise ValueError("OpenAI API密钥未配置")
            
            openai.api_key = api_key
            
            prompt = f"""请分析以下课程文本，生成一个结构化的PPT大纲。
要求：
1. 提取主要章节和要点
2. 为每个章节生成合适的标题
3. 为每个要点生成简洁的描述
4. 返回JSON格式的结构

文本内容：
{text}

请返回JSON格式，包含以下字段：
- title: 课程标题
- sections: 章节列表，每个章节包含title和points字段
"""
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "你是一个专业的课程内容分析师，擅长将文本内容转换为结构化的PPT大纲。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            result_text = response.choices[0].message.content
            
            # 解析JSON响应
            try:
                return json.loads(result_text)
            except:
                # 如果返回的不是纯JSON，尝试提取JSON部分
                import re
                json_match = re.search(r'\{.*\}', result_text, re.DOTALL)
                if json_match:
                    return json.loads(json_match.group())
                else:
                    return {"sections": self._parse_basic_structure(text)}
                    
        except Exception as e:
            print(f"OpenAI服务调用失败: {str(e)}")
            return {"sections": self._parse_basic_structure(text)}
    
    def _parse_basic_structure(self, text: str) -> list:
        """基础文本解析（无AI时的备用方案）"""
        # 这里可以使用现有的文本解析逻辑
        sections = []
        lines = text.strip().split('\n')
        current_section = None
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
            
            # 简单的章节识别
            if line.startswith('第') and ('章' in line or '节' in line):
                if current_section:
                    sections.append(current_section)
                current_section = {"title": line, "points": []}
            elif current_section:
                current_section["points"].append(line)
            else:
                if not sections:
                    sections.append({"title": "课程内容", "points": []})
                sections[0]["points"].append(line)
        
        if current_section:
            sections.append(current_section)
        
        return sections


class TTSService(AIService):
    """文本转语音服务"""
    
    def __init__(self, provider: str = "baidu"):
        super().__init__()
        self.provider = provider
        self.config = self.load_config()
    
    async def generate_speech(self, text: str, output_path: Optional[str] = None) -> str:
        """
        生成语音文件
        
        Args:
            text: 要转换的文本
            output_path: 输出文件路径（可选）
            
        Returns:
            音频文件路径
        """
        if self.provider == "baidu":
            return await self._baidu_tts(text, output_path)
        elif self.provider == "azure":
            return await self._azure_tts(text, output_path)
        else:
            raise ValueError(f"不支持的TTS服务提供商: {self.provider}")
    
    async def _baidu_tts(self, text: str, output_path: Optional[str] = None) -> str:
        """使用百度语音合成"""
        try:
            from aip import AipSpeech
            
            api_key = os.getenv("BAIDU_TTS_API_KEY")
            secret_key = os.getenv("BAIDU_TTS_SECRET_KEY")
            
            if not api_key or not secret_key:
                raise ValueError("百度TTS API密钥未配置")
            
            client = AipSpeech(api_key, secret_key, "")
            
            if not output_path:
                output_path = str(self.temp_dir / f"tts_{hash(text)}.mp3")
            
            # 调用百度TTS API
            result = client.synthesis(
                text,
                'zh',  # 语言：中文
                1,     # 语速：0-15，默认5
                {
                    'vol': 5,      # 音量：0-15，默认5
                    'per': 4,      # 发音人：0-4，0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫
                    'pit': 5,      # 音调：0-15，默认5
                    'spd': 5       # 语速：0-15，默认5
                }
            )
            
            if not isinstance(result, dict):
                # 成功返回音频数据
                with open(output_path, 'wb') as f:
                    f.write(result)
                return output_path
            else:
                # 失败返回错误信息
                raise Exception(f"百度TTS调用失败: {result.get('err_msg', '未知错误')}")
                
        except Exception as e:
            print(f"百度TTS服务调用失败: {str(e)}")
            raise
    
    async def _azure_tts(self, text: str, output_path: Optional[str] = None) -> str:
        """使用Azure语音合成"""
        try:
            import azure.cognitiveservices.speech as speechsdk
            
            speech_key = os.getenv("AZURE_SPEECH_KEY")
            speech_region = os.getenv("AZURE_SPEECH_REGION")
            
            if not speech_key or not speech_region:
                raise ValueError("Azure语音服务密钥未配置")
            
            speech_config = speechsdk.SpeechConfig(
                subscription=speech_key,
                region=speech_region
            )
            speech_config.speech_synthesis_voice_name = "zh-CN-XiaoxiaoNeural"
            
            if not output_path:
                output_path = str(self.temp_dir / f"tts_{hash(text)}.wav")
            
            synthesizer = speechsdk.SpeechSynthesizer(
                speech_config=speech_config,
                audio_config=speechsdk.audio.AudioOutputConfig(filename=output_path)
            )
            
            result = synthesizer.speak_text_async(text).get()
            
            if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
                return output_path
            else:
                raise Exception(f"Azure TTS调用失败: {result.reason}")
                
        except Exception as e:
            print(f"Azure TTS服务调用失败: {str(e)}")
            raise


class DigitalHumanService(AIService):
    """数字人服务"""
    
    def __init__(self, provider: str = "tencent"):
        super().__init__()
        self.provider = provider
        self.config = self.load_config()
    
    async def generate_avatar_video(
        self,
        text: str,
        audio_path: Optional[str] = None,
        output_path: Optional[str] = None
    ) -> str:
        """
        生成数字人讲解视频
        
        Args:
            text: 讲解文本
            audio_path: 音频文件路径（如果已生成）
            output_path: 输出视频路径
            
        Returns:
            视频文件路径
        """
        if self.provider == "tencent":
            return await self._tencent_digital_human(text, audio_path, output_path)
        else:
            raise ValueError(f"不支持的数字人服务提供商: {self.provider}")
    
    async def _tencent_digital_human(
        self,
        text: str,
        audio_path: Optional[str],
        output_path: Optional[str]
    ) -> str:
        """使用腾讯云数字人服务"""
        try:
            from tencentcloud.common import credential
            from tencentcloud.common.profile.client_profile import ClientProfile
            from tencentcloud.common.profile.http_profile import HttpProfile
            from tencentcloud.dh.v20230418 import dh_client, models
            
            secret_id = os.getenv("TENCENT_SECRET_ID")
            secret_key = os.getenv("TENCENT_SECRET_KEY")
            region = os.getenv("TENCENT_REGION", "ap-beijing")
            avatar_id = os.getenv("TENCENT_AVATAR_ID")
            
            if not secret_id or not secret_key:
                raise ValueError("腾讯云密钥未配置")
            
            if not avatar_id:
                raise ValueError("腾讯云数字人AvatarId未配置")
            
            # 初始化客户端
            cred = credential.Credential(secret_id, secret_key)
            httpProfile = HttpProfile()
            httpProfile.endpoint = "dh.tencentcloudapi.com"
            
            clientProfile = ClientProfile()
            clientProfile.httpProfile = httpProfile
            client = dh_client.DhClient(cred, region, clientProfile)
            
            # 如果没有音频，先使用TTS生成
            if not audio_path:
                tts_service = TTSService(provider="baidu")
                audio_path = await tts_service.generate_speech(text)
            
            # 上传音频到腾讯云（如果需要）
            # 这里需要根据腾讯云的实际API调整
            
            # 创建数字人视频请求
            req = models.CreateDigitalHumanVideoRequest()
            req.Text = text
            # req.AudioUrl = audio_url  # 如果音频已上传
            req.AvatarId = avatar_id
            
            # 调用API
            resp = client.CreateDigitalHumanVideo(req)
            
            # 下载生成的视频
            if not output_path:
                output_path = str(self.temp_dir / f"avatar_{hash(text)}.mp4")
            
            # 这里需要实现视频下载逻辑
            # 根据腾讯云API返回的VideoUrl下载视频
            import urllib.request
            urllib.request.urlretrieve(resp.VideoUrl, output_path)
            
            return output_path
            
        except Exception as e:
            print(f"腾讯云数字人服务调用失败: {str(e)}")
            raise

