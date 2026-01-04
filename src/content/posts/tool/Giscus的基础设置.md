---
title: "Giscus的基础设置"
description: "Giscus的基础设置"

published: 2025-10-04 09:47:42+08:00
lastmod: 2024-03-27T09:47:42+08:00

categories: 工具
id: giscus-config
tag:
  - Giscus
---


不过这两项评论系统与我目前搭建博客的理念是相悖的。一来是这两个系统没有让我获得所有的评论数据，二来是这两个系统让评论者也默认了他们的评论数据被交由这两个公司处理。随后了解到一些Gitment、Gitalk等一些基于GitHub Issues设计的评论系统。显然这些基于GitHub Issues的评论系统更符合我现在的理念。最后刚好也是因为目前这个博客主题Chirpy的更新，我也决定加入一个评论系统到博客里面。毕竟没有评论系统的博客感觉更像是一个对于作者本人的笔记本，少了一些可以讨论的部分。

新的Chirpy 5.0主题内置了三个评论系统的支持，分别是Disqus、Utterance和Giscus。这里选择了最年轻的Giscus作为评论系统。相关的配置在_config.yml下可以看到如下的配置：

```YAML
  giscus:
    repo:             # <gh-username>/<repo>
    repo_id:
    category:
    category_id:
    mapping:          # optional, default to 'pathname'
    input_position:   # optional, default to 'bottom'
    lang:             # optional, default to the value of `site.lang`
```

很显然其中三项并没有给出太详细的信息，在查询了多个帖子后，我确定了三项的对应的数据。在这里记录一下查询的方法。

首先，repo_id是托管博客的代码仓库的一个标识值，category是该仓库Issues里面对应的分类（或者说是主题）。一个仓库默认具有下面几个分类：Announcements、General、Ideas、Q&A、Show and tell。这里我选择General作为评论的分类。最后的category_id类似repo_id也是对该分类的一个标识值。

如何快速的获取这些数据呢，可以通过GitHub官方的[GraphQL API Explorer](https://docs.github.com/en/graphql/overview/explorer)查询到。这里把查询所用的语句进行记录。

```YAML
{
  repository(owner:  "MichaelTan9999", name: "michaeltan9999.github.io") {
    id
    discussionCategories (first: 5) {
      nodes {
        name
        id
      }
    }
  }
}
```

点击查询后，我们会得到如下结果：

```JSON
{
  "data": {
    "repository": {
      "id": "R_kgDOG6UKFQ",
      "discussionCategories": {
        "nodes": [
          {
            "name": "Announcements",
            "id": "DIC_kwDOG6UKFc4CBXaW"
          },
          {
            "name": "General",
            "id": "DIC_kwDOG6UKFc4CBXaX"
          },
          {
            "name": "Ideas",
            "id": "DIC_kwDOG6UKFc4CBXaZ"
          },
          {
            "name": "Q&A",
            "id": "DIC_kwDOG6UKFc4CBXaY"
          },
          {
            "name": "Show and tell",
            "id": "DIC_kwDOG6UKFc4CBXaa"
          }
        ]
      }
    }
  }
}
```

我们将对应的ID填到_config.yml就大功告成了。

别忘了在GitHub个人设置里面的Integrations中安装Giscus并授权
