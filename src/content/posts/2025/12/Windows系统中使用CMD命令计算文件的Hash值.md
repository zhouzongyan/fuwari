---
title: "Windows系统中使用CMD命令计算文件的Hash值"
categories: 工具
tags: ['Windows','文件Hash']
id: "windows-cmd-file-hash"
published: 2025-12-03 19:39:44
---

## 使用目的
为了检查档案是否有被修改或是传输有问题，有时候档案提供者会提供原始档案的杂凑值，当使用者取得档案后，可以用同样的方法执行杂凑，看看是否可以得到与原始提供者相同的杂凑值，假设结果相同，就可以确认档案的完整性。
## 使用方法
1. 打开CMD命令行窗口
2. 输入以下命令：
```bash
certutil -hashfile <file_name> [HashAlgorithm]
```
其中<file_name>为要计算Hash值的档案名称，[HashAlgorithm]为计算使用的算法，如MD2 MD4 MD5 SHA1 SHA256 SHA384 SHA512等。
#### 示例
1. 计算D:\test.txt文件的MD5值：
```bash
certutil -hashfile D:\test.txt MD5
```
## 参考来源
- [官方文档](https://docs.microsoft.com/zh-tw/windows-server/administration/windows-commands/certutil)