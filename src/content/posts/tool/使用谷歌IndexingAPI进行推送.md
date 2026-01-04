---
id: node-push-google-indexing
title: 使用谷歌 Indexing API 进行推送
published: 2025-11-06
categories: 工具
tags:
    - 谷歌站长
---

此文章针对插件: [https://github.com/Stonewuu/halo-plugin-sitepush](https://github.com/Stonewuu/halo-plugin-sitepush) 的谷歌推送部分

谷歌的推送需要很多配置, 有些麻烦, 并且网络环境得保证能访问谷歌

这是官方教程: [https://developers.google.com/search/apis/indexing-api/v3/prereqs](https://developers.google.com/search/apis/indexing-api/v3/prereqs)

## **创建 Google API 项目**

进入 [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials) 新建一个项目

![Xnip2023-10-19_09-06-35](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.4jo41arscs.webp)

**创建项目后再切换到新创建的项目进行下一步操作**

## **创建服务账号**

**在左边栏点凭据**

![Xnip2023-10-19_09-15-36](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.1e8m2cypgb.webp)

**这里的服务帐号 ID 生成的邮箱在稍后会用到, ID 随意**

![Xnip2023-10-19_09-16-28](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.b8wrh3n97.webp)

**点击完成后完成创建**

## **获取凭据文件**

![Xnip2023-10-19_09-19-45](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.8hghhz5eik.webp)

![Xnip2023-10-19_09-20-11](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.39l6uzcwzy.webp)

![Xnip2023-10-19_09-20-37](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.361kx9kb5y.webp)

![Xnip2023-10-19_09-21-07](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.1hs802uenw.webp)

**这里创建了私钥之后会自动下载一个 xxx.json 文件, 这个就是凭据**

## **开启 Indexing API 访问**

![Xnip2023-10-19_09-49-18](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.7sn7xyjkj4.webp)

**搜索 indexing**

![Xnip2023-10-19_09-50-26](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.2h8bd8xu6f.webp)

**选择第一个启用**

![Xnip2023-10-19_09-50-44](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.2ver446k0z.webp)

![Xnip2023-10-19_09-51-12](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.5mntc6t2f7.webp)

## **添加用户权限**

在 [https://search.google.com/search-console/](https://search.google.com/search-console/) 中选择自己已验证的资源

进入设置添加用户权限

![Xnip2023-10-19_09-43-22](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.1ap04nad2i.webp)

**把刚才生成的服务账号邮箱添加到此处, 并且权限选择拥有者 (一定要是拥有者)**

![Xnip2023-10-19_09-44-06](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20241101/image.2rv56eeuho.webp)
