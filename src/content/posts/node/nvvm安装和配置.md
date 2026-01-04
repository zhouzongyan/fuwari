---
id: nvm-install-and-config
published: 2025-11-14 11:08:00
categories: node
tag:
    - nvm
    - node
title: nvm安装和配置
---
# 介绍
nvm：nodejs 版本管理工具，类似于python的Miniconda，一个 nvm 可以管理很多 node 版本和 npm 版本。
# 安装
1、下载 [https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

2、选择exe下载后无脑下一步即可，exe版本回自动配置环境变量，安装过程中可以选择安装位置(建议安装到非中文路径)

3、打开cmd验证是否安装成功
# 常用命令
```bash
1. nvm arch：
   该命令显示 Node 正在以 32 位或 64 位模式运行。
2. nvm current：
   该命令显示当前活动的 Node 版本。
3. nvm debug：
   该命令检查 NVM4W 进程是否存在已知问题，并可帮助解决与 NVM 相关的任何问题。
4. nvm install <version> [arch]：
   该命令用于安装特定版本的 Node。您可以指定版本号，使用 "latest" 获取最新的当前版本，或使用 "lts" 获取最新的 LTS 版本。可选地，您可以指定安装 32 位或 64 位版本。
5. nvm list [available]：
   该命令列出已安装的 Node.js 版本。在末尾添加 "available" 将显示可安装的版本。此命令还可以别名为 "ls"。
6. nvm on：
   该命令启用 Node.js 版本管理。
7. nvm off：
   该命令禁用 Node.js 版本管理。
8. nvm proxy [url]：
   该命令设置用于下载的代理。将 [url] 留空将显示当前代理。将 [url] 设置为 "none" 将移除代理。
9. nvm node_mirror [url]：
   该命令设置 Node 镜像。默认情况下，它设置为 https://nodejs.org/dist/。将 [url] 留空将使用默认 URL。
10. nvm npm_mirror [url]：
    该命令设置 NPM 镜像。默认情况下，它设置为 https://github.com/npm/cli/archive/。将 [url] 留空将使用默认 URL。
11. nvm uninstall <version>：
    该命令卸载特定版本的 Node。
12. nvm use [version] [arch]：
    该命令切换到使用指定的 Node 版本。您可以使用 "latest"、"lts" 或 "newest" 作为快捷方式。可选地，您可以指定 32 位或 64 位架构。使用 "nvm use <arch>" 将继续使用所选版本，但切换到指定的位模式。
13. nvm root [path]：
    该命令设置 NVM 存储不同版本的 Node.js 的目录。如果未设置 [path]，将显示当前根目录。
14. nvm [--]version：
    该命令显示 Windows 版本的当前运行的 NVM 版本。也可以别名为 "v"。
```
# Node全局配置
```bash
npm config set prefix "D:\Nodejs\node_global"
npm config set cache "D:\Nodejs\node_cache"
```