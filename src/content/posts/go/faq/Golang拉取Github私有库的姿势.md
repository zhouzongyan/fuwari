---
title: "Golang拉取Github私有库的姿势"
description: "Golang拉取Github私有库的姿势"

published: 2024-05-13T15:27:56+08:00
lastmod: 2024-05-13T15:27:56+08:00
id: "go-private-repository"
categories: Golang
tags:
  - go 
  - module

# 原文作者
# Post's origin author name
#author:
# 原文链接
# Post's origin link URL
#link:
# 图片链接，用在open graph和twitter卡片上
# Image source link that will use in open graph and twitter card
#imgs:
# 在首页展开内容
# Expand content on the home page
#expand: true
# 外部链接地址，访问时直接跳转
# It's means that will redirecting to external links
#extlink:
# 在当前页面关闭评论功能
# Disabled comment plugins in this post
#comment:
#  enable: false
# 关闭文章目录功能
# Disable table of content
#toc: false
# 绝对访问路径
# Absolute link for visit
#url: "golang拉取github私有库的姿势.html"
# 开启文章置顶，数字越小越靠前
# Sticky post set-top in home page and the smaller nubmer will more forward.
#weight: 1
# 开启数学公式渲染，可选值： mathjax, katex
# Support Math Formulas render, options: mathjax, katex
#math: mathjax
# 开启各种图渲染，如流程图、时序图、类图等
# Enable chart render, such as: flow, sequence, classes etc
#mermaid: true
---

我们的 Go 项目拉取依赖时,默认使用的是 https 协议的 git clone 。因此当你的 Golang 项目位于 Github 的私有仓库时,而你本地的项目又依赖这个私有库,此时你应当先设置SSH 保证 Git 能无密码拉取到该依赖

<!--more-->
其次你还必须要设置 GOPRIVATE ,当你设置后, go get 命令在碰到该仓库时,将会不走 Go Proxy 从而进行直连。

示例:

```bash
go env -w GOPRIVATE=github.com/xhyonline
```

那么github.com/xhyonle 组织下的私有库在你使用 go get 命令时,都能被拉取下来,当然你一定需要设置 SSH 或者 Github Token(这两个选一个即可)

GOPRIVATE ，可以填写多个值，例如:

```bash
GOPRIVATE=*.corp.example.com,rsc.io/private
```

GOPRIVATE=*.corp.example.com,rsc.io/private
这样 go 命令会把所有包含这个后缀的软件包，包括 git.corp.example.com/xyzzy , rsc.io/private, 和 rsc.io/private/quux 都以私有仓库来对待。

使用 Github Token,使用 Token 的好处在于你可以进行 CI 集成

如果你使用 Github Token 你需要自行进行 Token设置

示例如下:

```bash
git config --global url."https://$UserName :$Token@github.com".insteadOf "https://github.com"
```

其中 $UserName 是你的用户名(注:是用户名,而不是登录 github 的邮箱,我的就是xhyonline)

$Token 是你申请的 Token

申请 Token 地址如下:[https://github.com/settings/tokens](https://github.com/settings/tokens)

当你设置号成功之后你可以通过下面这条命令查看是否设置成功

```bash
git config --global --list
```

当然你也可以重新编辑,使用下面这条命令即可

```bash
git config --global --edit
```

当你使用 Github Action 进行 CI 操作时,你就可以使用 Github Token

.github/workflows/github-action.yml 配置文件如下

```yaml
name: CI构建
on:
  push:
    branches: [ main,master ]
  pull_request:
    branches: [ main ,master ] # merge到main分支时触发部署

env:
  APP_NAME: myapp # 给 APP 起一个名字

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@master

      - name: 设置环境 Golang 环境
        uses: actions/setup-go@v2
        with:
          go-version: 1.17

      - name: 设置私有仓库和GoProxy
        run: |
          export GOPROXY=https://goproxy.io,direct
#         如果你有 github 的私有库,请自行设置 GOPRIVATE 示例如下,注下面的 UserName 是用户名,例如:xhyonline,而不是你登录 Github 的邮箱
#          git config --global url."https://${{ secret.UserName }}:${{secret.Token}}@github.com".insteadOf  "https://github.com"
#          export GOPRIVATE=github.com/xhyonline

      - name: CI-lint 代码质量检测
        uses: golangci/golangci-lint-action@v2
        with:
          # Optional: version of golangci-lint to use in form of v1.2 or v1.2.3 or `latest` to use the latest version
          version: v1.29

      - name: 构建 BuiLd
        run: |
          go build -o app

      - name: upx 压缩二进制文件
        uses: crazy-max/ghaction-upx@v1
        with:
          version: latest
          files: |
            app
          args: -fq

      - name: 同步文件
        uses: burnett01/rsync-deployments@5.1
        with:
          switches: -avzr --delete
          path: ./app
          remote_path: /micro-server/$APP_NAME # 发布到远程主机,当然你需要自己创建 /micro-server 目录 $APP_NAME 是全局的变量
          remote_host: ${{ secrets.Host }}
          remote_port: 22
          remote_user: root
          remote_key: ${{ secrets.DeploySecret }} # 请使用 ssh-keygen -t rsa 生成秘钥对,然后将公钥拷贝到要操纵的目标器的/root/.ssh/authorized_keys里,再把私钥黏贴到 github 后台的secret里

      - name: 执行重启命令
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.Host }}
          username: root
          key: ${{ secrets.DeploySecret }}
          port: 22
          script: | # 请自行在这里执行应用的重启命令,这里我没重启,只是查看了下构建的结果
            pwd
            ls /micro-server

      - name: 构建结果通知
        uses: zzzze/webhook-trigger@master
        if: always() # 失败成功总会发送
        with:
          data: "{'event_type':'build-result','status':'${{ job.status }}',
          'repository':'${{ github.repository }}','job':'${{ github.job }}',
          'workflow':'${{ github.workflow }}'}"
          webhook_url: ${{ secrets.WebHookURL }}
          options: "-H \"Accept: application/vnd.github.everest-preview+json\" -H \"Authorization: token ${{ secrets.TOKEN }}\""
```

相关资料如下:

[http://www.phpxs.com/post/7108/?ivk_sa=1024320u](http://www.phpxs.com/post/7108/?ivk_sa=1024320u)

[https://gist.github.com/Kovrinic/ea5e7123ab5c97d451804ea222ecd78a](https://gist.github.com/Kovrinic/ea5e7123ab5c97d451804ea222ecd78a)
