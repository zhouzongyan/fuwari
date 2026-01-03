---
title: windows系统中VS code未识别nodejs cmdlet错误
published: 2023-05-16 09:05:52
id: "windows-systems-vs-code-not-recognize-nodejs-cmdlet-error"
categories: Golang
---
# 报错
最近笔者在windows使用VS code开发的时候，遇到一个奇怪的问题，在调试代码的过程中，发现通过代码执行VS code的命令命令终端时，始终无法正常运行，一直报cmdlet错误，但是通过自己手动打开命令终端执行命令却一切正常。错误如下图所示：
![错误](https://github.com/zhouzongyan/zhouzongyan.github.io/raw/image/20231013/image.1l92ck5nobi8.webp)

# 处理
经过查询资料发现，是由于windows权限问题，导致对应的脚本执行在代码打开的终端没有权限，直接就报错了，最开始由于编码问题看不到对应的错误信息，一直查询各种资料、代码断点，都没有发现问题，最后退出VS code，重新以管理员权限打开VS code再执行程序就解决了。
![执行成功](https://github.com/zhouzongyan/zhouzongyan.github.io/raw/image/20231013/image.1venu2ofhzs0.webp)