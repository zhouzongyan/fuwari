---
title: "Npm私有仓库搭建——Verdaccio"
description: "npm私有仓库搭建——Verdaccio"

published: 2024-04-29T10:49:52+08:00
lastmod: 2024-04-29T10:49:52+08:00
id: "node-npm-private-repository-verdaccio"
categories: Node
tags:
  - verdaccio
  - npm

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
#url: "npm私有仓库搭建——verdaccio.html"
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

众所周知，每家公司都有可能需要发布自己的私有仓库，所以要将包发布到内网而不是发布到npm的公共注册表，以下使用**`verdaccio`**，搭建一个简单的私有npm仓库。

<!--more-->

1. **安装Verdaccio**:

首先，你需要在你的机器上安装**`verdaccio`**。你可以通过npm来安装它：

```bash
npm install -g verdaccio
```

1. **运行Verdaccio**:

一旦安装完毕，你可以运行**`verdaccio`**来启动你的私有注册表服务器：

```bash
verdaccio --listen 192.168.0.8:4873
```

默认情况下，它将在**`http://localhost:4873`**上运行。

1. **添加用户（可选）**:

如果你想要保护你的私有注册表，你可以添加一个用户并设置密码：

```bash
npm adduser --registry http://localhost:4873
```

1. 登录用户

```jsx
npm login --registry http://localhost:4873/
```

1. **发布包**:

现在你可以发布你的包到你的私有注册表。确保你在项目的**`package.json`**文件中指定了正确的**`name`**和**`version`**，然后运行以下命令：

```bash
npm publish --registry http://localhost:4873
```

你的包现在应该已经发布到你的私有注册表，并可以通过该注册表进行安装。

1. **安装包**:

要从你的私有注册表安装包，你可以运行以下命令：

```bash
npm install your-package-name --registry http://localhost:4873
```

更新最新的包

```bash
npm install [package-name]@latest --registry http://localhost:4873
