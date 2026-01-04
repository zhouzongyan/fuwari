---
title: Docker 常用命令大全
published: 2025-10-03
tags:
    - Docker
categories: Docker
id: docker-common-commands
---

Docker 常用命令导图：

![Docker 常用命令导图](https://i0.wp.com/github.com/zhouzongyan/picx-images-hosting/raw/master/20240619/image.2obdvmc3d9.webp)

# 基本命令

|  命令   | 说明  |
|  ----  | ----  |
| docker info  | 检查当前容器的安装情况（包括镜像数、容器书、多少个物理机节点） |
| docker version  | 查看当前安装的 Docker 的版本信息 |

# 容器生命周期相关命令

|  命令   | 说明  |
|  ----  | ----  |
|docker run -d -p x:x --name xxx 镜像id|以后台方式运行容器|
|docker create --name xxx nginx:latest| 创建一个新的容器，但是不启动|
|docker start/stop/restart| 启动\停止\重启一个容器|
|docker kill |容器id 终止一个运行中的容器，kill 不管是否同意，直接强制终止|
|docker rm -vf |容器id 删除一个或者多个容器|
|docker exec -it id bash| 进入到容器内部|
|docker attach| 进入到容器内部|

# 容器操作相关命令

|  命令   | 说明  |
|  ----  | ----  |
|docker ps -a grep xxxx| 显示某一个组件 XXX 的容器列表|
|docker inspect id| 获取容器或者镜像的元数据|
|docker top id| 查看容器中运行的进程信息|
|docker stats id| 实时显示容器资源的使用统计|
|docker events| 从服务器获取实时事件|
|docker logs id |查看容器内的标准日志输出|
|docker port id |列出指定容器的端口映射|
|docker cp ./t.txt id:/root/| 将宿主机当前目录下的 t.txt 复制到 id 容器中的 root 目录下|
|docker diff id |列出该容器自创建以来，容器内部文件的变化|
|docker commit -m "comment" -a "authon"| 容器id repository:tag 将指定容器打包成一个本地镜像|
|docker update --memory=16G| 修改容器运行中的配置，即时生效无需配置|

# 本地镜像管理相关命令

|  命令   | 说明  |
|  ----  | ----  |
|docker images| 列出本地宿主机上的所有镜像|
|docker history id| 查看指定镜像的分层结构以及创建历史|
|docker image inspect id| 查看镜像的元数据信息|
|docker rmi id| 根据镜像 id 删除镜像|
|docker tag image-name:tag| 给指定镜像增加 tag|
|ocekr build -t tag .| 通过当前目目录下的 Dockerfile 来构建一个标签为 tag 的镜像|
|docker export -o xxx.tar id| 将镜像打包成文件|
|docker import xxx.tar name| 从归档文件中创建镜像|
|docker save -o xxx.tat id |将指定镜像保存为归档文件|
|docker load --input xxx.tar| 用于将 docker save 生成的归档文件还原成镜像|

# 镜像仓库相关命令

|  命令   | 说明  |
|  ----  | ----  |
|docker loging -u xxx -p xxx| 登录一个 docker 镜像仓库，如果未指定镜像仓库地址，则默认为Docker Hub镜像仓库|
|docker logout| 退出登录的镜像仓库|
|docker pull nginx| 从默认的 Docker hub 上拉取 nginx 镜像|
|docker push image_name |将本地镜像上传到镜像仓库（注意需要先登录）|
|docker search xxx| 从默认的 Docker Hub 中搜索指定的镜像|

# 参数命令
>
> 以下汇总 docker run 命令支持的相关参数：

## 容器运行相关参数

|  命令   | 说明  |
|  ----  | ----  |
|-a,--attach=[]| 是否绑定到标准输入、输出、和错误.|
|-d,--detach=true|false| 是否在后台运行，默认为 false|
|--detach-keys=""| 从attach模式退出的快捷键，默认是 Ctrl+P|
|--entrypoint=""| 镜像存在入口命令时覆盖新的命令.|
|-expost=[]| 暴露出来的镜像端口|
|--group-add=[]| 运行容器的用户组|
|-i| 保持标准输入打开|
|--ipc=""| 容器 IP 命名空间|
|--isolation="default"| 容器使用的隔离机制|
|--log-driver=""| 指定容器的日志驱动类型|
|--log-opy=[]| 传递给日志驱动的选项|
|--net="bridge"| 指定容器的网络模式|
|--net-alias=[]| 容器在网络中的别名|
|--volume=[=[HOST-DIR]:]CONTAINER-DIR:[:OPTIONS]| 挂载宿主机上的数据卷到容器内|
|--volume-driver=""| 挂载数据卷的驱动类型.|
|--volumes-from=[]| 其他容器挂载数据卷|

## 容器环境配置相关参数

|  命令   | 说明  |
|  ----  | ----  |
|--add-host=[]| 在容器内添加一个宿主机名到 IP 地址的映射关系，修改 HOST 文件|
|--device=[]| 映射物理机上的设备到容器|
|--dns-search=[] |指定容器 DNS 搜索域|
|--dns-opt=[]| 自定义的 DNS 选项|
|--dns=[]| 自定义的 DNS 服务器|
|-e,-env=[]| 指定容器内的环境变量|
|-env-file=[]| 从文件中读取环境变量到容器内|
|-h,--hostname=""| 指定容器中的主机名|
|--ip=""| 指定容器内 ip4 的地址|
|--ip6=""| 指定容器内 ip6 的地址|
|--link=[id]| 连接到其他容器，不需要其他容器暴露端口|
|--name==""| 指定容器的别名|

# CPU 相关参数

|  命令   | 说明  |
|  ----  | ----  |
|--cpu-shares=0 |允许容器使用 CPU 资源的相对权重，默认一个容器能用满一个 CPU，用于设置多个容器竞争 CPU 时，各个容器相对能分配到 CPU 时间占比|
|--cpu-period=0| 限制容器在 CFS 调度下 CPU 占用的时间片，用于绝对设置容器能使用的 CPU 时间|
|--cpu-quota=0| 限制容器在 CFS 调度器下的 CPU 配额，用于绝对设置容器能使用 CPU 的时间|
|--cpuset-cpus=""| 限制容器能使用那些 cpu 核数|
|--cpuset-mems=""| NUMA 架构下使用那些核心内存|

# 内存资源相关参数

|  命令   | 说明  |
|  ----  | ----  |
|--kernel-memory=""| 限制容器使用内核的内存大小|
|-m,--memory=""| 限制容器内应用使用内存的大小|
|--memory-reservation=""| 当系统中内存过小时，容器会被强制限制内存到给定值默认情况下等于内存限制值|
|--memory-swap="LIMIT"| 限制容器使用内存和交换分区的大小|
|--oom-kill-disable=true| 内存耗尽时是否终止容器|
|--oom-score-adj=""| 调整容器的内存耗尽参数|
|--memory-swappiness="0-100"| 调整容器的内存交换分区参数|

# 容器磁盘 IO 控制相关参数

|  命令   | 说明  |
|  ----  | ----  |
|--device-read-bps| 限制此设备上的读速率|
|--device-read-iops| 通过每秒读 IO 次数限制指定设备的读速率|
|--device-write-bps| 限制此设备的写速率|
|--device-write-iops| 通过每秒写 IO 次数限制指定设备的写速率|
|--blkio-weight| 容器默认磁盘 IO 的加权值|
|--blkio-weight-device| 针对特定设备的 IO 加权控制|
