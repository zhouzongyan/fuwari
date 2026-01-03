---
title: "处理nmap扫描结果XML在浏览器无法查看"
categories: 安全
tags: ['Nmap', "XML"]
id: "nmap-xml-browser-cannot-view"
published: 2025-11-28 16:48:55
---

# 问题
最近因为软件端口问题，使用nmap进行端口扫描，结果保存为XML文件，在浏览器中打开XML文件查看扫描结果，结果页面空白，啥都没有，打开F12控制台，发现有错误，错误提示如下：
![image](https://i0.wp.com/github.com/zhouzongyan/picx-images-hosting/raw/master/20251127/image.41yhx0qokl.webp)

# 解决
由于浏览器的安全限制，导致无法加载Nmap的nmap.xsl进行渲染，最终找到快速的解决方案是：

1. 找到nmap.xsl文件，将其保存到本地Nmap安装路径，并修改nmap.xml文件，将xsl文件的路径改为：`/nmap.xsl`
![image](https://i0.wp.com/github.com/zhouzongyan/picx-images-hosting/raw/master/20251127/image.3ns265ntx2.webp)
2. 启动http服务器，我本地安装了Node，直接使用Node的服务，如果有安装其他的，也可以换成其他服务；
启动命令：
```bash
npx http-server .
```
3. 打开浏览器，输入`http://localhost:8080/ceshi.html`，就可以看到扫描结果了。