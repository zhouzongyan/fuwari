---
title: windows重启命令
description: Windows 快速重启命令是 shutdown /r /t 0，可在 CMD、PowerShell 或 Win+R 运行框中执行，实现立即强制重启
date: 2026-03-13
published: 2026-03-13 17:20:46
---
Windows 快速重启命令是 shutdown /r /t 0，可在 CMD、PowerShell 或 Win+R 运行框中执行，实现立即强制重启。其中 /r 代表重启，/t 0 代表延迟0秒。其他常用参数包括 /f（强制关闭应用）和 /a（取消重启）。
---
## 核心重启命令详解

- 立即重启（不强制）： shutdown /r /t 0
- 立即强制重启： shutdown /r /f /t 0（即使有未保存文件也强制重启）
- 指定时间重启： shutdown /r /t 300（5分钟后重启，300为秒数）
- 取消计划的重启： shutdown /a

## 执行方式：

1、按下 Win + R 键，输入上述命令并回车。
2、打开“命令提示符”或“PowerShell”输入命令。
3、通过任务管理器（Ctrl+Shift+Esc）点击“文件”->“运行新任务”输入命令。