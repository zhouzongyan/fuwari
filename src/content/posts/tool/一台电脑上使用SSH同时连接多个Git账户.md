---
title: 一台电脑上使用SSH同时连接多个Git账户
categories: Git
tags:
    - Git
published: 2025-10-03 19:10:00
id: git-with-multi-git-account
---

1. 同时两个Github账户
1.1. 建立SSH公私钥
先打开Git Bash窗口，输入命令，切换到对应目录C:\Users\随心\.ssh，随心是你电脑对应的用户名

```bash
cd ~/.ssh
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.8ojjpcmnoz.webp)

执行命令，生成第一个账号的SSH

```bash
ssh-keygen -t rsa -C "<1107224733@qq.com>"
```

不要一路回车，在第一个对话的时候输入公私钥重命名为id_rsa_dolyw

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/image.1lbo9qod29.webp)

同理第二个也是这样

```bash
ssh-keygen -t rsa -C "<158020951@qq.com>"

```

在第一个对话的时候输入公私钥重命名为id_rsa_wliduo

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/image.4jnyd8y4k6.webp)

这里使用两个账号，以后只需按照这样继续添加账号即可，切换到对应目录C:\Users\随心\.ssh，一个账号两个文件(私钥和公钥)

Ps: 好像如果是Linux还需要添加一下私钥文件，Windows好像不用

1.2. 建立配置文件
输入下面命令建立config文件

```bash
touch config
```

打开文件输入下面代码

```bash
Host dolyw
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_dolyw

Host wliduo
HostName github.com
User git
IdentityFile ~/.ssh/id_rsa_wliduo
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.1e8geb567e.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.1hs2c0yndo.webp)

1.3.登录配置公钥
登录Github配置公钥，登录点击Settings，SSH and GPG keys，New SSH key
打开对应账号的id_rsa_dolyw.pub公钥文件，把内容复制到Key里

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.73tspw0fse.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.86ti0rwoej.webp)

添加成功，测试是否成功，打开窗口，输入命令

```bash
ssh -T dolyw
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.7sn29wp8b7.webp)

这样就成功了，wliduo账户一样的操作，登录Github配置公钥

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.361f97r2vs.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.45himedm3i.webp)

```bash
ssh -T wliduo
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.6ik53l8ss5.webp)

成功，可以使用两个账号Clone，Push测试下

2. 添加码云(Gitee)账户
2.1. 建立SSH公私钥
先打开Git Bash窗口，输入命令，切换到对应目录C:\Users\随心\.ssh，随心是你电脑对应的用户名

```bash
cd ~/.ssh
```

执行命令，生成第一个账号的SSH

```bash
ssh-keygen -t rsa -C "<1107224733@qq.com>"
```

不要一路回车，在第一个对话的时候输入公私钥重命名为id_rsa_gitee

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.9gwf73huyg.webp)

2.2. 修改配置文件
打开C:\Users\随心\.ssh\config文件输入下面代码

```bash
Host gitee
HostName gitee.com
User git
IdentityFile ~/.ssh/id_rsa_gitee
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.7egmj1jvxf.webp)

2.3. 登录配置公钥
去码云登录账号添加部署SSH公钥

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.7egmj1k9fs.webp)

添加成功，测试是否成功，打开窗口，输入命令

```bash
ssh -T gitee
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.2dojrhdyo6.webp)

这样就成功了

3. 添加Coding账户
3.1. 建立SSH公私钥
先打开Git Bash窗口，输入命令，切换到对应目录C:\Users\随心\.ssh，随心是你电脑对应的用户名

```bash
cd ~/.ssh
```

执行命令，生成第一个账号的SSH

```bash
ssh-keygen -t rsa -C "<1107224733@qq.com>"
```

不要一路回车，在第一个对话的时候输入公私钥重命名为id_rsa_coding

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.7p55pmz1a.webp)

3.2. 修改配置文件
打开C:\Users\随心\.ssh\config文件输入下面代码

```bash
Host coding

# HostName git.dev.tencent.com

HostName e.coding.net
User git
IdentityFile ~/.ssh/id_rsa_coding
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.86ti0s2myj.webp)

3.3. 登录配置公钥
去Coding登录账号添加部署SSH公钥

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.8s35n2xggu.webp)

添加成功，测试是否成功，打开窗口，输入命令，输入yes确定

```bash
ssh -T coding
```

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.4uas6en47b.webp)

这样就成功了

4. 地址使用注意
地址必须注意类似`<git@github.com>:dolyw/ShiroJwt.git，github.com`需要更换为配置中的host
例如`<git@github.com>:dolyw/ShiroJwt.git`需要修改为`git@dolyw:dolyw/ShiroJwt.git`

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.39l16xqddg.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.67xbafyyey.webp)

5. 账户使用注意
默认是全局的用户名和邮箱，如果不想使用全局的用户名和邮箱，记得给每个仓库设置局部的用户名和邮箱

```bash
git config user.name "name"
git config user.email "email"
```

6. Gitlab使用注意
生成密钥看文档先，注意 -b 4096

```bash
ssh-keygen -t rsa -C "<your.email@example.com>" -b 4096
```

7. 工具使用注意
7.1. IDEA
IDEA记得设置SSH认证为Native

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.9rj9092gjr.webp)

7.2. TortoiseGit
TortoiseGit记得设置SSH认证为Git默认的

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.2obdkmxcyk.webp)

8. 修改Https为SSH
也可以直接修改.git下的config文件

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240611/image.86ti0s5xbw.webp)

9. WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED
Git 错误 错误描述 错误原因 解决办法 错误描述 错误原因 远程的 Gitlab 服务发送了变化，加密的也随之发生了变化，所以本地 /.ssh/known_hosts 中保存的也发生了变化。 解决办法 (1)删除 /.ssh/known_hosts 文件中的内容 (2)重新 pull 一下即可
