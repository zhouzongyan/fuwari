---
title: RustDesk远程桌面工具自建服务器教程
published: 2025-11-10
id: self-install-rustdesk
categories: 工具
---

简介
RustDesk，工具如其名，基于高效的 Rust 语言构建的开源远程桌面工具。

优势：

（1）轻量：不论服务端还是客户端、不论哪个平台，软件小巧、功能完备。

（2）全平台支持：支持 Android、Linux、Windows 任意双向控制，iOS 单向控制。

（3）安全可控：软件开源，服务端自建，通信加密。

（4）带宽高效：仅需 2-3M 即可流畅 1080P，支持 TCP 打洞端对端 P2P 连接。

RustDesk 官网：[https://rustdesk.com/zh/](https://rustdesk.com/zh/)

GitHub：[https://github.com/rustdesk/rustdesk](https://github.com/rustdesk/rustdesk)

运行原理
![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.969ls0ywpf.webp)

RustDesk 自建服务器运行原理

### 自建服务器

免费的公共服务器非常卡，在国内也许网速会很慢或者无法访问。

RustDesk 的优势在于可以使用自己的服务器，推荐使用国内主流云产品厂商，个人使用的腾讯云搭建服务器，价格不贵可以接受，相比于远程流畅度来说物超所值，且服务器唯自己所有，不用担心第三方远控软件造成的信息安全问题。

### 服务器要求

硬件要求很低，最低配置的云服务器就可以了，CPU 和内存要求都是最小的。

关于网络大小，如果控制端和被控端位于同一网段下时，不需要通过 relay server 中转，直接建立内网链接。

如果 TCP 打洞直连失败，就要耗费中继流量，一个中继连接的流量在 30k-3M 每秒之间（1920x1080 屏幕），取决于清晰度设置和画面变化。如果只是办公需求，平均在 100K/s。

非直连情况下，播放全屏视频（1920x1080 屏幕）实测近两分钟，带宽平均占用 1.3Mbps 左右。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.1sewj9gzr7.webp)

Docker 部署
在 Docker 部署和常规部署之间选择一个即可。

> Linux/amd64

```bash
sudo docker image pull rustdesk/rustdesk-server
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server hbbr
```

> Linux/arm64v8

```bash
sudo docker image pull rustdesk/rustdesk-server:latest-arm64v8
sudo docker run --name hbbs -p 21115:21115 -p 21116:21116 -p 21116:21116/udp -p 21118:21118 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbs -r <relay-server-ip[:port]>
sudo docker run --name hbbr -p 21117:21117 -p 21119:21119 -v `pwd`:/root -td --net=host rustdesk/rustdesk-server:latest-arm64v8 hbbr
```

据我所知，–net=host 仅适用于 Linux，它让 hbbs/hbbr 可以看到对方真实的 ip, 而不是固定的容器 ip (172.17.0.1)。 如果–net=host 运行正常，-p 选项就不起作用了, 可以去掉。

请去掉 –net=host，如果您在非 Linux 系统上遇到无法连接的问题

### 1、常规部署 直接运行

This content is only supported in a ThunderSoft Docs

在服务器上运行 hbbs/hbbr (Centos 或 Ubuntu)。

```bash
./hbbs -r <hbbr运行所在主机的地址[:port]>
./hbbr
```

默认情况下，hbbs 监听 21115(tcp), 21116(tcp/udp), 21118(tcp)，hbbr 监听 21117(tcp), 21119(tcp)。务必在防火墙开启这几个端口， 请注意 21116 同时要开启 TCP 和 UDP。其中 21115 是 hbbs 用作 NAT 类型测试，21116/UDP 是 hbbs 用作 ID 注册与心跳服务，21116/TCP 是 hbbs 用作 TCP 打洞与连接服务，21117 是 hbbr 用作中继服务, 21118 和 21119 是为了支持网页客户端。如果您不需要网页客户端（21118，21119）支持，对应端口可以不开。

-   TCP(21115, 21116, 21117, 21118, 21119)
-   UDP(21116)
    |端口号| 协议| 程序| 用途 |锚点|
    |---|---|---|---|---|
    |21115| tcp| HBBS| NAT 类型测试|
    |21116| tcp/udp |HBBS| TCP| 打洞与连接服务/UDP ID 注册与心跳服务| HBBS 锚点|
    |21117| tcp| HBBR| 中继服务| HBBR 锚点|
    |21118| tcp |HBBS| WebSocket 服务| |
    |21119| tcp| HBBR| WebSocket 转发| |
    如果你想选择自己的端口，使用 “-h” 选项查看帮助。

## 2、守护进程

至此我们的自建服务器已经运行起来了，至此服务器完全可以使用 RustDesk，但你会发现当你退出了服务器远程连接，服务器就自动停掉了，所以我们还需要将自建服务器的进程守护起来。

在 pm2 和 systemd 之间选择一个即可，建议使用 systemd。

### 1、使用 pm2

```bash
pm2 start hbbs -- -r <relay-server-ip[:port]>
pm2 start hbbr
```

`pm2` 需要 nodejs v16+，如果你运行 pm2 失败（例如在 `pm2 list` 中看不到 hbbs/hbbr），请从 [https://nodejs.org](https://nodejs.org/) 下载并安装 LTS 版本的 nodejs。 如果你想让 hbbs/hbbr 在重启后自动运行，请查看 `pm2 save` 和 `pm2 startup`。 更多关于 pm2。另一个不错的日志工具是 [`pm2-logrotate`](https://github.com/keymetrics/pm2-logrotate)。

hhbs 的-r 参数不是必须的，他只是方便你不用在客户端指定中继服务器，如果是默认 21117 端口，可以不填 port。客户端指定的中继服务器优先级高于这个。

#### 2、使用 systemd

官方建议使用 PM2 守护进程，如果你的主机没有其它使用 Node.js 工具的需求，只需要使用 systemd 来管理服务即可！

#### ① HBBS

解压出来的 hbbs 文件先通过`chmod +x hbbs`赋予可执行权限，先运行一次`./hbbs`，生成用于客户端认证使用的公钥`id_ed25519.pub`，随后用`cat id_ed25519.pub`命令查看公钥并记下。然后通过喜欢的编辑器编辑`/etc/systemd/system/hbbs.service`，将用于参考的以下配置根据需要进行修改并保存，这时也要将强制校验密钥以`-k _`参数写入启动命令中。

```bash
# systemd配置路径

# /etc/systemd/system/hbbs.service

[Unit]
Description=Rust Desk Service
After=network.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=5s
# 设置运行路径

WorkingDirectory=/*程序路径*/rustdesk

# 可修改锚点端口，当前为21116（锚点）和21115（锚点-1）和21118（锚点+2）

# -r用于指定网卡IP（适用多网卡），-k参数用于强制校验客户端公钥，用于避免未授权的使用

ExecStart=/*程序路径*/rustdesk/hbbs -r 0.0.0.0 -p 21116 -k _

[Install]
WantedBy=multi-user.target
```

#### ② HBBR

解压出来的 hbbr 文件先通过`chmod +x hbbr`赋予可执行权限，然后通过喜欢的编辑器编辑`/etc/systemd/system/hbbr.service`，将用于参考的以下配置根据需要进行修改并保存，同样将密钥校验以`-k _`参数写入启动命令中。

```bash
# systemd配置路径

# /etc/systemd/system/hbbr.service

[Unit]
Description=Rust Desk Service
After=network.target

[Service]
Type=simple
User=root
Restart=on-failure
RestartSec=5s

# 设置运行路径

WorkingDirectory=/*程序路径*/rustdesk

# 可修改锚点端口，当前为21117（锚点）和21119（锚点+2）

# -k参数用于强制校验客户端公钥，用于避免未授权的使用

ExecStart=/*程序路径*/rustdesk/hbbr -p 21117 -k _

[Install]
WantedBy=multi-user.target
```

`service`设置好后，即可通过`service hbbs start`和`service hbbr start`来启动这两项服务，启动后可以通过`service hbbs status`和`service hbbr status`查看进程的运行状态，显示绿色的 Active 即无误。

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.1758wz1g2b.webp)

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.6wql8jwu50.webp)

一切准备就绪后即可通过`systemctl enable hbbs`和`systemctl enable hbbr`允许它们开机自启。

### 端口放行

在腾讯云服务器上，进入服务器详情->防火墙->添加规则，然后编辑相应端口和规则即可，不必关心以下指令。

如果恰好你有能力搭建了一台物理主机，则需要你手动设置防火墙规则，`iptables`、`firewalld`、`ufw`的命令分别如下，其中的端口请按照你的设置的进行放行（默认 21115-21117），这里需要注意 hbbs 锚点端口必须同时放行 tcp 和 udp。

```bash
# CentOS firewalld

firewall-cmd --zone=public --add-port=21115/tcp --permanent
firewall-cmd --zone=public --add-port=21116/tcp --permanent
firewall-cmd --zone=public --add-port=21116/udp --permanent
firewall-cmd --zone=public --add-port=21117/tcp --permanent

# Debian/Ubuntu ufw

ufw allow 21115/tcp
ufw allow 21116/tcp
ufw allow 21116/udp
ufw allow 21117/tcp

# iptables

iptables -I INPUT 1 -p tcp --dport 21115 -j ACCEPT
iptables -I INPUT 1 -p tcp --dport 21116 -j ACCEPT
iptables -I INPUT 1 -p udp --dport 21116 -j ACCEPT
iptables -I INPUT 1 -p tcp --dport 21117 -j ACCEPT
iptables-save //保存（解决重启失效）
```

客户端连接
![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.4ckqvwyfwe.webp)

ID 服务器填写你的服务器 IP 地址:21116

中继服务器填写你的服务器 IP 地址:21117

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.7i08uutei9.webp)

随后你只需要使用 ID 和密码即可使用自建服务器的 RustDesk。

### 开机自启

在我们远程控制主机时，可能不得不完成重启的操作，远控软件不自启可不行，那么接下来我们一起来配置一下自启。

编辑文本文档 rustdesk.service

```bash
[Unit]
Description=RustDesk
Requires=network.target
After=systemd-user-sessions.service

[Service]
Type=simple
ExecStart=/usr/bin/rustdesk --service
PIDFile=/var/run/rustdesk.pid
KillMode=mixed
TimeoutStopSec=30
User=root
LimitNOFILE=100000

[Install]
WantedBy=multi-user.target
```

移动到 /usr/lib/systemd/system 文件夹下，执行：

```bash
sudo systemctl enable rustdesk
```

使用

```bash
systemctl status rustdesk
```

查看服务运行状态：

![](https://github.com/zhouzongyan/picx-images-hosting/raw/master/20240621/image.3go9ggqtjc.webp)

参考
【RustDesk】自建远程桌面服务替代 TeamViewer/Todesk – Luminous' Home: [https://luotianyi.vc/6542.html](https://luotianyi.vc/6542.html)
安装 :: RustDesk 文档: [https://rustdesk.com/docs/zh-cn/self-host/install](https://rustdesk.com/docs/zh-cn/self-host/install/)
Working principle · Issue #594 · rustdesk/rustdesk: [https://github.com/rustdesk/rustdesk/issues/594#issuecomment-1138342668](https://github.com/rustdesk/rustdesk/issues/594#issuecomment-1138342668)
Systemd 入门教程：命令篇 - 阮一峰的网络日志: [https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html](https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)
Systemd 入门教程：实战篇 - 阮一峰的网络日志: [https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html](https://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html)
