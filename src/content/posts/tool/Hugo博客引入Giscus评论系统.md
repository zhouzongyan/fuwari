---
title: "Hugo博客引入Giscus评论系统"
description: "Hugo博客引入Giscus评论系统"

published: 2025-10-04 10:04:12+08:00
lastmod: 2024-03-27T10:04:12+08:00
id: hugo-with-giscus
tags:
  - Giscus
  - Hugo
categories: 工具

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
#url: "hugo博客引入giscus评论系统.html"
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

Hugo博客引入Giscus评论系统

<!--more-->
# 1. 选择一个评论系统

当前使用的 hugo 生成静态博客，主题是 LoveIt。该主题已经支持了多种评论系统：

disqus
gitalk
valine
facebook
telegram
giscus
….
有很多，其中 giscus 是基于 Github Discussions 的，我们的博客也是放在 Github 的，那么为了简单起见就选择 giscus 吧。

## 什么是 gitcus？

Giscus 是由 GitHub Discussions 驱动的评论系统，根据官网，Giscus的特性有：

开源。
无跟踪，无广告，永久免费。
无需数据库。全部数据均储存在 GitHub Discussions 中。
支持自定义主题！
支持多种语言。
高度可配置。
自动从 GitHub 拉取新评论与编辑。
可自建服务！

## 原理

Giscus 使用 GitHub Discussions 作为数据库存储博客下面的评论。

Giscus 插件加载时，会使用 GitHub Discussions 搜索 API 根据选定的映射方式（如 URL、pathname、 等）来查找与当前页面关联的 discussion。如果找不到匹配的 discussion，giscus bot 就会在第一次有人留下评论或回应时自动创建一个 discussion。

要评论，访客必须按 GitHub OAuth 流程授权 giscus app 代表他发帖。或者访客也可以直接在 GitHub Discussion 里评论，作者可以在 GitHub 上管理评论。

# 2. 引入 giscus

由于主题已经支持 gitcus 评论了，因此引入其实是比较简单的，大致分为以下几个步骤：

0）选择一个仓库作为存储 Discussions 的仓库

一般选择博客本身即可，比如这里我用的就是这个 zhouzongyan/zhouzongyan.github.io

## 1）安装 giscus

将 giscus 安装到上一步指定的仓库，这样 giscus 才有权限获取数据

## 2）开启 GitHub Discussions

将上面选择的仓库开启 GitHub Discussions 用于存放评论

## 3）从 giscus 官网获取配置信息

## 4）将上一步中获取的配置添加到博客配置

### 1. 选择一个仓库

一般选择博客本身即可，比如这里我用的就是这个 zhouzongyan/zhouzongyan.github.io

### 2. 安装 giscus

点击 这里 进入 giscus app 的 安装界面，大概长这样：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/image.45g6wa64v.webp)

点击安装，会提示选择一个仓库，这里就选择上一步中指定的仓库即可，后续 giscus 就会从该仓库读取数据。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.4xub31l1nh.webp)

### 3. 开启 Discussions

然后打开之前选择的仓库，进入设置界面，勾选上 Discussions 以开启该仓库的 Discussions。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.39ky5uw5pn.webp)

### 4. 从 giscus 官网获取配置信息

完成上述准备工作后就可以访问 giscus 官网 获取配置信息了，具体如下：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.7ljrdefy4b.webp)

几个标箭头的地方需要注意：

1）填写前面选择的仓库
正常情况下填写后会提示满足条件，如果提示不满足条件就检查下前面几个步骤是不是有遗漏
2）页面和 discussion 的映射关系
这里一般用默认的 pathname 即可
该选项主要会影响创建的 discussion 的名字
3）最后就是选择后面 giscus 创建的 discussion 的分类
一般选择 Announcements，因为 Announcements 类型的 discussion 只有管理员才有权限操作，这样便于管理
上面几个地方配置完成后，页面往下滑，会生成一个配置文件：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.sypqxq7wk.webp)

这个就是我们后续要用到的配置文件，主要关注以下字段：

* data-repo
* data-repo-id
* data-category
* data-category-id
* data-mapping

### 5. 配置到博客

将上面获取到的配置信息添加博客主题对应的位置即可。

这里不同的主题配置方式可能不太一样，不过需要配置的即可参数应该是相同的

```TOML
[params.page.comment]
enable = true
[params.page.comment.giscus]
# You can refer to the official documentation of giscus to use the following configuration.
# 你可以参考官方文档来使用下列配置
enable = true
repo = "lixd/lixd.github.io"
repoId = "xxx"
category = "Announcements"
categoryId = "xxxx"
mapping = "pathname"
```

配置好之后重新部署即可看到效果。

# 3. 效果展示

## 预览

点开一篇文章，滑到底部会看到评论区，大概长这样：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.3d4k3kxvgt.webp)

通过 github 登录后即可参与评论。

discussion
有人评论后，giscus 会自动在配置好的仓库的 discussion 里创建一条数据用于保存评论。

大概长这样：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6t6vvo8146.webp)

在这里可以对评论进行管理~

到此，整个配置就完成了，具体细节可以参考 [这个仓库](https://github.com/zhouzongyan/zhouzongyan.github.io)
