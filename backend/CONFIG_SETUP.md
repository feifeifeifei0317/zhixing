# 配置文件设置说明

## 重要提示

由于安全原因，`.env` 文件不能自动创建。请手动创建并配置。

## 步骤1：创建 .env 文件

在 `backend` 目录下创建 `.env` 文件，内容如下：

```env
# 百度文心一言配置
# 注意：如果你提供的API KEY格式是 bce-v3/ALTAK-xxx/xxx
# 这可能是完整的访问凭证，需要从百度控制台获取正确的API Key和Secret Key
BAIDU_WENXIN_API_KEY=bce-v3/ALTAK-oDpvHkWPdRZICYNFeRLQW/fb0c36240f550ac7275869d7617d0f77e955f7a8
BAIDU_WENXIN_SECRET_KEY=

# 百度语音合成配置
BAIDU_TTS_API_KEY=ELJ4dAAnf4THxeOv4AF5lSIT
BAIDU_TTS_SECRET_KEY=0mrpWrwb0Z5QAxZweQJh65NJMjJNdVJm

# 功能开关
ENABLE_AI_ENHANCEMENT=true
AI_PROVIDER=baidu
```

## 步骤2：关于API KEY格式的说明

你提供的百度文心一言API KEY格式看起来不太标准。通常百度文心一言需要：

1. **API Key (AK)** - 格式类似：`your_api_key_here`
2. **Secret Key (SK)** - 格式类似：`your_secret_key_here`

你提供的 `bce-v3/ALTAK-oDpvHkWPdRZICYNFeRLQW/fb0c36240f550ac7275869d7617d0f77e955f7a8` 可能是：

### 情况A：这是完整的访问凭证
如果是这样，代码会尝试直接使用它作为access_token。如果不行，需要：
1. 登录百度智能云控制台
2. 找到"文心一言"服务
3. 查看"API管理"，获取正确的 **API Key** 和 **Secret Key**

### 情况B：这是API Key的一部分
如果是这样，需要：
1. 从百度控制台获取完整的API Key
2. 获取对应的Secret Key
3. 填入.env文件

## 步骤3：验证配置

启动后端服务，查看日志：
- 如果看到 "✓ AI增强服务已启用" - 配置成功
- 如果看到 "⚠ 警告：API KEY格式可能不正确" - 需要检查API KEY格式
- 如果看到 "百度AI服务调用失败" - 需要检查API密钥是否正确

## 步骤4：测试

1. 测试文本转PPT - 应该会使用AI增强
2. 测试PPT转视频 - 应该会生成带语音的视频（不包含数字人）

## 如果遇到问题

1. **API KEY格式错误**：
   - 登录 https://console.bce.baidu.com/
   - 找到"文心一言"服务
   - 查看"API管理"获取正确的密钥

2. **TTS服务失败**：
   - 确认BAIDU_TTS_API_KEY和BAIDU_TTS_SECRET_KEY正确
   - 确认已开通百度语音合成服务

3. **查看详细错误**：
   - 查看后端控制台输出的错误信息
   - 检查是否有网络连接问题








