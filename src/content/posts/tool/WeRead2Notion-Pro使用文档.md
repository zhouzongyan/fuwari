---
title: 'WeRead2Notion Pro使用文档'
description: 'WeRead2Notion-Pro使用文档'
id: WeRead2Notion-Pro
date: 2024-03-27T13:35:45+08:00
published: 2024-03-27T13:35:45+08:00
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
#url: "weread2notion-pro使用文档.html"
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

WeRead2Notion-Pro 使用文档

<!--more-->

-   [预览效果](https://malinkang.notion.site/534a7684b30e4a879269313f437f2185?pvs=4)

## 使用

`{{< note warning >}}`
Weread2Notion 和 Weread2Notion-Pro 是两个不同的项目，模板也不相同，切勿用错模板。

-   Weread2Notion 教程：[https://malinkang.com/posts/weread2notion/](https://malinkang.com/posts/weread2notion/)
-   热力图使用教程：[https://malinkang.com/posts/github_heatmap/](https://malinkang.com/posts/github_heatmap/)
    `{{< /note >}}`

### Fork 工程

打开[Weread2Notion-Pro](https://github.com/malinkang/weread2notion-pro)，点击右上角的 Fork（顺便点个 star 谢谢）

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6t6vvuelxq.webp)

### 权限

确保你打开了读写权限。

依次选择 Settings->Actions->General，然后下拉，找到 Workflow permissions，如果没有选中 Read and write permissions，请选中，然后点下面的 save 保存。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.361c8bjy70.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.9gwc67966p.webp)

### 获取微信读书 Cookie

1. 浏览器打开[网页版微信读书](https://weread.qq.com/)扫码登录
2. 按 F12 进入开发者模式，依次点网络->文档，然后选中 weread.qq.com，下拉找到 Cookie，复制 Cookie 值

`{{< note tip >}}`
如果没有内容显示，请刷新下浏览器。

建议使用 Chrome 浏览器，有的小伙伴使用 QQ 浏览器拿到的 Cookie 一直不能用。
`{{< /note >}}`

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6bgu79fw13.webp)

### 获取 NotionToken

1. 浏览器打开[https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)点击 New integration 按钮，输入 name 后点 Submit。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.41xtnrvnoj.webp)

2. 提交完成后，进入 Secrets 页面，先点击 Show，然后点击 Copy 复制，后面需要用到

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.4n7ha2qpmn.webp)

### 复制 Notion 模板

1. 浏览器打开模板[https://malinkang.notion.site/13d2e1548f024687a42ec68a79a01c62?pvs=4](https://malinkang.notion.site/13d2e1548f024687a42ec68a79a01c62?pvs=4)，点击右上角的 Duplicate 复制。

2. 打开你刚复制的模板，点击右上角的三个点，找到`Connections`，然后添加你创建的 Integration。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.9dcq8hiqf6.webp)

3. 点击右上角的 Share，然后点击 Copy link 获取页面的链接。
   ![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6wqhtkc9wr.webp)

`{{< note warning >}}` 这里是通过数据库的名字来自动获取对应的 ID 的，所以请先不要修改数据库的名字。`{{< /note >}}`

### 在 Github 的 Secrets 中添加变量

1. 打开你 fork 的工程，点击 Settings->Secrets and variables->New repository secret

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.101xmjwfo9.webp)

2. Name 输入 WEREAD_COOKIE，Secret 输入框中填入你前面获取的微信读书 Cookie，然后点击 Add secret

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6wqhtkdecr.webp)

3. 同理，继续点击 New repository secret，分别增加变量名 NOTION_TOKEN 和 NOTION_PAGE。NOTION_TOKEN 的值为前面获取的 NOTION_TOKEN 值，NOTION_PAGE 值为前面获取的页面链接，最终的结果如下图所示。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.5mnkn8vwvl.webp)

> 注意这三个变量名一定要填写正确，一个字母都不能错，否则会同步失败。之前遇到过有的同学 NOTION_DATABASE_ID 写成 NOTION_DATEBASE_ID。

### 运行

上面配置完成之后，打开你 Fork 的项目，依次点击 Actions->weread note sync-> Run workflow，就可以运行了。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.39ky61ieyv.webp)

以相同的方式运行 read time sync。weread note sync 主要用来同步书籍、笔记和划线。read time sync 用来生成热力图和同步阅读时长。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.6t6vvulhkr.webp)

## 问题排查

1. 可以点击你 Fork 项目的 Action，查看运行状态，绿色是成功，红色是失败。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.lvhvoq4x6.webp)

> 运行成功，只代表程序没有出错，不代表就一定同步数据，比如微信 Cookie 过期就不会报错。所以如果运行成功，Notion 中没有数据的话，也可以通过下面第 2 步来查看日志

2.可以点进去查日志，来自行排查问题。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.8kzuqr5kbx.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240327/image.4ckngxfpf9.webp)

## 问题解答

1. WeRead2Notion 和 WeRead2Notion-Pro 有什么区别

> WeRead2Notion 不支持在笔记中添加自己的笔记，每次有新笔记会删除原有的笔记。WeRead2Notion-Pro 支持添加自己的笔记，每次更新不会覆盖笔记。WeRead2Notion 功能更加简洁，同步速度更快。WeRead2Notion-Pro 支持按照年、月、周、日的阅读时长、笔记数阅读数的时间统计，支持数据可视化。所以选用哪个看个人喜好，也可以两个都用。

2. 如何自动运行

> Github Action 提供每日定时自动运行程序的功能。之前有的朋友会问，我关了电脑会同步吗，该脚本运行在 Github 的服务器上，并不是运行在你的电脑上，所以你关机并不会影响程序自动运行。

3. 每天何时同步

> 笔记设置的是 utc 时间的 0 点同步，如果你在中国，那就是每天 8 点同步。不过据我观察，Github 这个可能有延迟。时间同步是每 3 个小时运行一次。你也可以自行修改同步时间，具体参考[这里](https://docs.github.com/zh/actions/using-workflows/events-that-trigger-workflows#schedule)。需要注意的是 Github 每个月 2000 分钟有免费的额度，如果改的过于频繁可能会导致额度不够。

4. 模板中哪些可以修改

> Database 中的 Formula 和 Rollup 类型的属性名可以修改，其他的属性名不支持修改，因为代码中是通过属性的名字来增加修改这个属性的，修改了名字程序就无法正常运行。要修改数据库的名字需要按照以下步骤。
> 依次选择 Settings->Secrets and variables -> variables-> New repository variable。

具体的变量名可以参考下表中的变量名，值为你想要修改的名字。

| 变量名                 | 当前数据库的名字 |
| ---------------------- | ---------------- |
| BOOK_DATABASE_NAME     | 书架             |
| REVIEW_DATABASE_NAME   | 笔记             |
| BOOKMARK_DATABASE_NAME | 划线             |
| DAY_DATABASE_NAME      | 日               |
| WEEK_DATABASE_NAME     | 周               |
| MONTH_DATABASE_NAME    | 月               |
| YEAR_DATABASE_NAME     | 年               |
| CATEGORY_DATABASE_NAME | 分类             |
| AUTHOR_DATABASE_NAME   | 作者             |
| CHAPTER_DATABASE_NAME  | 章节             |

除此之外，其他数据可以任意修改，包括页面的布局都不会影响程序运行。

5. 年月周天中的进度是什么

> 这里的进度我设置的是每天 1 小时，每周 7 小时，每月 30 小时，每年 365 小时。你可以自行修改公式设置你的进度。

6. 表中的时间是什么

> 如果这本书你读完了，时间是读完的时间，如果没有读完，就是你最后阅读的时间。表中的日，周，月，年都是根据这个时间来设置的。

## 升级

打开你 Fork 的项目，点击 Sync fork 进行同步
![](https://docs.github.com/assets/cb-75616/mw-1440/images/help/repository/sync-fork-dropdown.webp)

当然你也可以上面使用中提到的步骤重新来一遍。
