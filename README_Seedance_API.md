# Seedance 2.0 API 调用示例

这是一个使用火山引擎 API 调用字节跳动 Seedance 2.0 视频生成模型的 Python 示例代码。

## 前置要求

1. 你需要从**火山引擎/火山方舟**购买并开通 Seedance 2.0 API 服务
2. 获取你的 `Access Key` 和 `Secret Key`
3. 确保 API 服务已启用

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements-seedance.txt
```

### 2. 配置环境变量

Windows PowerShell:
```powershell
$env:VOLCENGINE_ACCESS_KEY = "你的access_key"
$env:VOLCENGINE_SECRET_KEY = "你的secret_key"
```

Windows CMD:
```cmd
set VOLCENGINE_ACCESS_KEY=你的access_key
set VOLCENGINE_SECRET_KEY=你的secret_key
```

### 3. 运行示例

```bash
python seedance_api_demo.py
```

按照提示选择生成方式：
- 1: 文生视频 - 只用文字提示生成视频
- 2: 图生视频 - 参考一张图片生成视频
- 3: 多模态生成 - 支持文字+多张图片混合参考（Seedance 2.0 核心特性）

## 可用功能

| 方法 | 说明 | 支持 |
|---|---|---|
| `text_to_video()` | 文生视频 | ✅ 纯文本生成 |
| `image_to_video()` | 图生视频 | ✅ 图片参考+文字 |
| `multimodal_to_video()` | 多模态生成 | ✅ 最多 9图+3视频+3音频+文字混合参考 |
| `wait_for_completion()` | 自动轮询等待 | ✅ 自动等待生成完成 |
| `download_video()` | 下载视频到本地 | ✅ 保存到本地文件 |

## 参数说明

### 时长选项
- `5` 秒 - 快速生成，适合测试
- `10` 秒 - 平衡选择
- `15` 秒 - Seedance 2.0 支持的最长时长，适合完整片段

### 分辨率
- `720p` - 默认，速度快
- `1080p` - 高清，需要更多积分

### 模型版本
- `seedance-2.0` - 标准质量版本，效果更好
- `seedance-2.0-fast` - 快速版本，生成速度更快

## 费用说明

- 火山方舟按照生成的**token 数**或**视频时长**计费
- 具体价格请参考火山引擎控制台定价
- 新用户一般有免费试用额度

## 示例调用

```python
from seedance_api_demo import Seedance20APIClient

client = Seedance20APIClient(access_key, secret_key)

# 文生视频
result = client.text_to_video(
    prompt="一只熊猫在竹林里悠闲地吃竹子，阳光透过竹叶洒下来，慢镜头，4K高清",
    duration=10,
    resolution="1080p"
)

task_id = result["task_id"]
final_result = client.wait_for_completion(task_id)
video_url = final_result["output"]["video_url"]

print(f"生成完成: {video_url}")
```

## 在 Web 应用中集成

如果你想集成到自己的网站，可以参考这个结构：

1. 用户在前端输入提示词/上传图片
2. 你的后端调用这个 API 创建任务
3. 轮询状态，生成完成后返回视频 URL 给前端
4. 前端播放或让用户下载

## 获取 API 入口

- 火山方舟体验中心: https://volcengine.com/experience/ark
- 找到 Seedance 2.0 模型，开通 API 服务后即可获取密钥

## 注意事项

- Seedance 2.0 目前暂不支持上传真人图片作为主体参考
- 生成时间一般在 30-90 秒，取决于视频长度
- 请妥善保管你的 Access Key 和 Secret Key，不要提交到代码仓库
- 建议添加异常处理和超时控制
