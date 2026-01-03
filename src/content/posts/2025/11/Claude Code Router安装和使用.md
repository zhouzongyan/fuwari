---
title: "Claude Code Router安装和使用"
categories: Code
tags: ['Claude', "Code","Router"]
id: "claude-code-router-install-andconfig"
published: 2025-11-15 12:03:00
---

:::note
Claude Code Router 就是这样一款强大的 Claude Code 开源代理工具，它可以将 Claude Code 的请求路由到不同的大模型，并支持自定义任何请求。
:::
### 介绍

主要功能如下：

- 模型路由：根据您的需求将请求路由到不同的模型（比如：后台任务、思考、长上下文）。
- 多提供商支持：支持 OpenRouter、DeepSeek、Ollama、Gemini、Volcengine 和 SiliconFlow 等各种模型提供商。
- 请求/响应转换：使用转换器为不同的提供商自定义请求和响应。
- 动态模型切换：在 Claude Code 中使用 /model 命令动态切换模型。
GitHub Actions 集成：在您的 GitHub 工作流程中触发 Claude Code 任务。
- 插件系统：使用自定义转换器扩展功能。

### 安装

1、安装Claude Code
安装之前记得先安装Git
```bash
   npm install -g @anthropic-ai/claude-code      
```
安装完成后，使用`claude –version`验证是否安装成功

2、安装Claude Code Router
Claude Code Router 开源地址：

[https://github.com/musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

执行安装命令：
```bash
npm install -g @musistudio/claude-code-router
```
安装后，创建并配置你的 `~/.claude-code-router/config.json` 文件：
```js
{
  "LOG": false,
  "HOST": "0.0.0.0",
  "API_TIMEOUT_MS": 600000,
  "Providers": [
    {
      "name": "deepseek",
      "api_base_url": "https://api.deepseek.com/chat/completions",
      "api_key": "sk-xxx",
      "models": ["deepseek-chat", "deepseek-reasoner"],
      "transformer": {
        "use": ["deepseek"],
        "deepseek-chat": {
          "use": ["tooluse"]
        }
      }
    },
    {
      "name": "gemini",
      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",
      "api_key": "xx",
      "models": ["gemini-2.5-flash", "gemini-2.5-pro"],
      "transformer": {
        "use": ["gemini"]
      }
    }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "background": "deepseek,deepseek-chat",
    "think": "deepseek,deepseek-reasoner",
    "longContext": "gemini,gemini-2.5-pro",
    "longContextThreshold": 60000,
    "webSearch": "gemini,gemini-2.5-flash"
  }
}

```
主要配置项如下表:

|配置项|	必选|	说明|	示例|
|-----|-----|----|----|
|PROXY_URL|	可选|	API 请求代理地址|	"http://127.0.0.1:7890"|
|LOG|	可选|	启用日志，文件位于 |$HOME/.claude-code-router.log	true|
|APIKEY|	可选|	API 访问密钥，需在 Authorization 或x-api-key 请求头传入|	"your-secret-key"|
|HOST|	可选|	服务主机地址；未设置 APIKEY 时默认强制 127.0.0.1|	"0.0.0.0"|
|NON_INTERACTIVE_MODE|	可选|	非交互模式，适配 CI/CD 等自动化环境	|true|
|Providers|	可选|	配置不同模型提供商|	—|
|Router|	可选|	路由规则：<br/> - default：常规任务默认模<br/>- background：后台任务模型（可用小型本地模型降成本<br/>- think：推理密集型任务模型<br/>- longContext：长上下文模型（> 60K token）<br/>- longContextThreshold（可选）：触发长上下文的 token 阈值，默认 60000<br/>- webSearch：网络搜索模型（openrouter 需加 :online 后缀）|	— |
|API_TIMEOUT_MS|	可选|	API 请求超时时间（毫秒）|	30000|
### 使用 Router 运行 Claude Code
在某个项目下使用 `ccr code` 命令来启动 Claude Code，启动 Claude Code 成功后，主界面会显示代理的 API 信息：

![启动](https://i0.wp.com/github.com/zhouzongyan/picx-images-hosting/raw/master/20251127/image.2a5j0r0amj.webp)

注意：修改配置文件后，需要重启服务使配置生效：

`ccr restart`

### UI 模式 (Beta)
为了获得更直观的体验，可以使用 UI 模式来管理配置，命令如下：
`
ccr ui
`
这个命令会打开一个基于 Web 的界面：
![UI](https://i0.wp.com/github.com/zhouzongyan/picx-images-hosting/raw/master/20251127/image-1.60uolzo8qb.png)
Claude Code 本身体验极好，但受限于昂贵的订阅费用和网络环境，想要长期使用成本并不低。

而 Claude Code Router 提供了一种更灵活、低成本的替代方案：保留 Claude Code 的使用习惯，同时自由接入任意大模型提供商，实现模型的路由、切换与请求适配，大大提升了自由度与可控性。