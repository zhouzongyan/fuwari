---
title: Go 配置 VS code 启动
published: 2023-05-15 20:29:27
id: "go-configuration-vs-code-start"
categories: Golang
---
  最近笔者在学习gokins过程中，最开始的时候，使用goland编译运行，但是后面由于免费试用天数用完就无法使用了，经过比较，还是决定使用VS code运行，但是VS code默认是不支持运行，需要自己手动配置
  
## 1、安装go插件

![go插件](https://github.com/zhouzongyan/zhouzongyan.github.io/raw/image/20231013/image.2tobfm377v20.webp)

## 2、安装debug插件

- 输入快捷键`Ctrl + Shift + P`打开命令快捷输入框，输入`go install`,选择下图的选项

![debug插件](https://github.com/zhouzongyan/zhouzongyan.github.io/raw/image/20231013/image.3it3pxblypi0.webp)

- 然后下一个选择框选择dlv 的debug组件（这边建议全选，避免后面使用到对应的工具又要再装一遍），点击OK就可以开始安装了，安装过程中由于是下载国外资源，会比较慢和失败，建议多试几次，如果实在不行的话，就使用手动安装的方式，安装方式请参考dlv的[github库指南](https://github.com/derekparker/delve/tree/master/Documentation/installation)

![安装](https://github.com/zhouzongyan/zhouzongyan.github.io/raw/image/20231013/image.6q35wsamw2k0.webp)
## 3、配置启动文件
`ctrl+shift+p` 输入 `Debug: Open launch.json` 打开 `launch.json` 文件，如果第一次打开,会新建一个配置文件，默认配置内容如下：
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [

		{
            "name": "Launch",
            "type": "go",
            "request": "launch",
            "mode": "auto",
            "program": "${fileDirname}",
            "env": {},
            "args": []
        }
	]
}
```
常用的属性如下所示：

| 属性       | 介绍                                                                                                                                                                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name       | 调试界面下拉选择项的名称                                                                                                                                                                                                        |
| type       | 设置为go无需改动，是 vs code 用于计算调试代码需要用哪个扩展                                                                                                                                                                     |
| mode       | 可以设置为 auto, debug, remote, test, exec 中的一个                                                                                                                                                                             |
| program    | 调试程序的路径（绝对路径）                                                                                                                                                                                                      |
| env        | 调试时使用的环境变量。例如:`{ "ENVNAME": "ENVVALUE" }      `                                                                                                                                                                      |
| envFile    | 包含环境变量文件的绝对路径，在 env 中设置的属性会覆盖 envFile 中的配置                                                                                                                                                          |
| args       | 传给正在调试程序命令行参数数组                                                                                                                                                                                                  |
| showLog    | 布尔值，是否将调试信息输出                                                                                                                                                                                                      |
| logOutput  | 配置调试输出的组件（debugger, gdbwire, lldbout, debuglineerr, rpc）,使用,分隔， showLog 设置为 true 时，此项配置生效                                                                                                            |
| buildFlags | 构建 go 程序时传给 go 编译器的标志，如果需要使用构建标记（e.g. go build -tags=whatever_tag）在参数 buildFlags 里写入 -tags=whatever_tag" 即可，支持多标签，使用单引号将标签包围,例如： "-tags='first_tag second_tag third_tag'" |
| remotePath | 远程调试程序的绝对路径，当 mode 设置为 remote 时有效                                                                                                                                                                            |
其中对应的常用VS code常用公用变量如下所示：
| 属性               | 介绍                                          |
| ------------------ | --------------------------------------------- |
| `${workspaceFolder}` | 调试 VS Code 打开工作空间的根目录下的所有文件 |
| `${file}`          | 调试当前文件                                  |
| `${fileDirname }`    |  调试当前文件所在目录下的所有文件            |
> 具体的其他配置，请参考VS code 的[官方文档](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations)