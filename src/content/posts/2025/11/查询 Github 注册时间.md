---
title: "查询 Github 注册时间"
categories: 工具
tags: ['github',"注册时间"]
id: "query-github-register-time"
published: 2025-11-17 20:05:21
---

:::note
查询 Github 注册时间
:::

访问 `https://api.github.com/users/用户名`,例如： [https://api.github.com/users/zhouzongyang](https://api.github.com/users/zhouzongyang)

响应结果如下：
```json
{
  "login": "zhouzongyan",
  "id": 18110319,
  "node_id": "MDQ6VXNlcjE4MTEwMzE5",
  "avatar_url": "https://avatars.githubusercontent.com/u/18110319?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/zhouzongyan",
  "html_url": "https://github.com/zhouzongyan",
  "followers_url": "https://api.github.com/users/zhouzongyan/followers",
  "following_url": "https://api.github.com/users/zhouzongyan/following{/other_user}",
  "gists_url": "https://api.github.com/users/zhouzongyan/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/zhouzongyan/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/zhouzongyan/subscriptions",
  "organizations_url": "https://api.github.com/users/zhouzongyan/orgs",
  "repos_url": "https://api.github.com/users/zhouzongyan/repos",
  "events_url": "https://api.github.com/users/zhouzongyan/events{/privacy}",
  "received_events_url": "https://api.github.com/users/zhouzongyan/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Allen",
  "company": null,
  "blog": "https://chn.cc",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": "道可道，非常可道；名可名，非常可名！",
  "twitter_username": null,
  "public_repos": 135,
  "public_gists": 3,
  "followers": 8,
  "following": 23,
  "created_at": "2016-03-28T05:40:43Z",
  "updated_at": "2025-11-14T01:50:23Z"
}
```
其中 `created_at` 为注册时间