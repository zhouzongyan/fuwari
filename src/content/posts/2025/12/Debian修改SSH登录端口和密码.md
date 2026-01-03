---
title: "Debian修改SSH登录端口和密码"
categories: Linux
tags: ['Linux',"端口","安全"]
id: "debian-change-ssh-port-and-password"
published: 2025-12-09 09:39:24
---

# 修改SSH端口
1. 备份原sshd配置文件
```bash
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup
```
2. 修改sshd配置文件
```bash
vim /etc/ssh/sshd_config
```
> 查找Port 22，有可能 Port 22 是注释的(即前面有#号，有的话删掉 # 号)。

在 Port 22 下面添加一行 Port 3322  其中3322为你更改SSH后的端口,修改完成后保存。

3. 重启SSH服务器
重启SSH服务器命令：
```bash
systemctl restart sshd
```

如果没有报错的话就生效了，可以 ss -ntl 或 netstat -ntl 查看一下端口。

4. 防火墙、安全组规则设置

防火墙可参考对应的服务配置。

阿里云之类的安全组规则添加SSH新端口规则：
阿里云之类的有安全组之类设置的云服务器一定要在安全组规则里将新端口添加到“入方向”的允许规则。
# 修改密码
输入命令：
```bash
sudo passwd root
```
系统将提示您输入并确认新的 root 密码（输入密码时，密码不会显示在屏幕上），终端中内容类似如下：
```bash
New password: 
Retype new password: 
passwd: password updated successfully
```