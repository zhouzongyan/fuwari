---
title: '无服务器自建短链服务Url Shorten Worker完整的部署教程'
description: '无服务器自建短链服务Url-Shorten-Worker完整的部署教程'
id: cloudflare-work-short-url
date: 2024-03-19T11:01:48+08:00
published: 2024-03-19T11:01:48+08:00
categories: 工具
---

无服务器自建短链服务 Url-Shorten-Worker 完整的部署教程

<!--more-->

[源码 GitHub](https://github.com/crazypeace/Url-Shorten-Worker)

### 申请 Cloudflare 账号，略

### 创建一个 KV

记得这个 KV 的名字，以 urlsrv 为例

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEjebnhhOSRKgzvkla6s7hLBCSHe2slJpr1hf-DoNrXWNJIH6RCTLyoA5cJA2s4mQuTYxSfsZduWFOAH6jN-NfqbIak4wJImRpDsCOopdX6FA7kbiDZRwn10pZZZWERZ3K0y7Btqi9Chl79_Rn5g2opntlmiXkMVIDRnVuz0Eis6AXT8cCTZdMuSMOwg=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEjebnhhOSRKgzvkla6s7hLBCSHe2slJpr1hf-DoNrXWNJIH6RCTLyoA5cJA2s4mQuTYxSfsZduWFOAH6jN-NfqbIak4wJImRpDsCOopdX6FA7kbiDZRwn10pZZZWERZ3K0y7Btqi9Chl79_Rn5g2opntlmiXkMVIDRnVuz0Eis6AXT8cCTZdMuSMOwg)

#### 查看此 KV

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEhBUJuZnhvq_cBbkx1gUw0D4R___9xhJRwJbVDS0WZY5J6iaNB4xOpYpjtLME1182MWIb1-sHHMtK6wLhMz-YxtMknUE7iVGr4zyWKqLbCNLeO_sh_ePMIwH-lCL19Dvbdc1S8npBaWi5r5V51CvyLSKFoM9CTM_ddCfJeBod2K6OKfaxU-arpfgVx7=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEhBUJuZnhvq_cBbkx1gUw0D4R___9xhJRwJbVDS0WZY5J6iaNB4xOpYpjtLME1182MWIb1-sHHMtK6wLhMz-YxtMknUE7iVGr4zyWKqLbCNLeO_sh_ePMIwH-lCL19Dvbdc1S8npBaWi5r5V51CvyLSKFoM9CTM_ddCfJeBod2K6OKfaxU-arpfgVx7)

#### 添加一个条目 Entry

密钥 key 为 password，值 value 为一个随机字符串.

\* password 这个 key 是在脚本中要引用的，所以要设置这个。

随机字符串可以使用生成[网站](http://git.io/xkcdpw)

随机字符串以 yejiandianci 为例

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEhfciJWtH4Bi106WPz83oSYbZ79PX9gCXkvsJUYPn97FP_WCSj7_wXhIu2Tio8rIywZQ5B1pRRpkI52uMOplpF6q5XQCWkGZK-zIvqgFYlRzDkePaf-LpgafJNZ0cUAz5kFsZ2B6msMY98lHA0flGy_TM_euMpTVBeJMFxgcnKj84AeGqDUJVU21Ulw=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEhfciJWtH4Bi106WPz83oSYbZ79PX9gCXkvsJUYPn97FP_WCSj7_wXhIu2Tio8rIywZQ5B1pRRpkI52uMOplpF6q5XQCWkGZK-zIvqgFYlRzDkePaf-LpgafJNZ0cUAz5kFsZ2B6msMY98lHA0flGy_TM_euMpTVBeJMFxgcnKj84AeGqDUJVU21Ulw)

### 创建 Worker 服务

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEiLc3UMWhDYvcSGYsJse4r1h-hbBhYt-V7MzOe6Tzl1it7YUsmmAYpEneGbZZ9P-2tVB7BkGY2bSUZGdX99eDACGRK-P1FSzb7NDBkvXsdxdTFkUifP5t6M3q-gB2EMJX-KlW-OWxSaKKQVMcP1MiGpMHieFef38rPa_Qe37lW401ZQub4aRnPgXZdt=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEiLc3UMWhDYvcSGYsJse4r1h-hbBhYt-V7MzOe6Tzl1it7YUsmmAYpEneGbZZ9P-2tVB7BkGY2bSUZGdX99eDACGRK-P1FSzb7NDBkvXsdxdTFkUifP5t6M3q-gB2EMJX-KlW-OWxSaKKQVMcP1MiGpMHieFef38rPa_Qe37lW401ZQub4aRnPgXZdt)

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEgwkVtGRGWmzk-lDr29-GEVYWp6tvReRugVH1bKU7QKkcfaJGmDqJTW9A9eu_dKtm2Qa9-WAU67VogNd072-g9hEBe6bR8jEmmqeDm9LekHhnf_7SyBeUgNCHLzTRSsPCMvH0-EuTMbNxIeFo2xtrqbnmH2JWcBYkk3mHyGpyd036h_LCPuSC1zX4Mx=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEgwkVtGRGWmzk-lDr29-GEVYWp6tvReRugVH1bKU7QKkcfaJGmDqJTW9A9eu_dKtm2Qa9-WAU67VogNd072-g9hEBe6bR8jEmmqeDm9LekHhnf_7SyBeUgNCHLzTRSsPCMvH0-EuTMbNxIeFo2xtrqbnmH2JWcBYkk3mHyGpyd036h_LCPuSC1zX4Mx)

#### 设置绑定 KV

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEg_2uH-69uno099gSqDipIjI-6aKD0EH_vmAMEV58UDz87FWlThVpKLHQxV7XiOxRxMHViPjAynoifkko7jsophtQuS9p7AgAAZ-hRVeNjcuyRRQ3UlU3Rbp3-5D22ZVvu3Sqe3mff4k0qQRTwvCSL3xgzZqbHG0GwQTzD9HGOQAZDajhJpGPJt-8ZI=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEg_2uH-69uno099gSqDipIjI-6aKD0EH_vmAMEV58UDz87FWlThVpKLHQxV7XiOxRxMHViPjAynoifkko7jsophtQuS9p7AgAAZ-hRVeNjcuyRRQ3UlU3Rbp3-5D22ZVvu3Sqe3mff4k0qQRTwvCSL3xgzZqbHG0GwQTzD9HGOQAZDajhJpGPJt-8ZI)

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEgxXF5orTn9cYMB_XccuNbJ64A5Q0y1DWL1wEMpuO-SlccHKLUPR79eI-ZfL1ZnXSoww7-LQcokGa1vj_-6ig8qRK2z-TEZkmsYCp-43oMKaOH6_R7MAPIIAmYwP5ZYtDPtMo-W1munfYkINBhAxA7g1sq53e9K8KTzkgbEeMsWeEdYw-zXscTsTOHB=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEgxXF5orTn9cYMB_XccuNbJ64A5Q0y1DWL1wEMpuO-SlccHKLUPR79eI-ZfL1ZnXSoww7-LQcokGa1vj_-6ig8qRK2z-TEZkmsYCp-43oMKaOH6_R7MAPIIAmYwP5ZYtDPtMo-W1munfYkINBhAxA7g1sq53e9K8KTzkgbEeMsWeEdYw-zXscTsTOHB)

变量名称必须设置为 LINKS， KV

的名字选刚刚创建的 urlsrv

\* LINKS 是在脚本中要引用的，所以要设置这个。换句话说，如果你使用别的脚本，可能这个变量名称就不是

LINKS

了。

#### 编辑 Worker 的脚本

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEiZsgUcVCEgCMPntaeOxGVW4vUMdsR3vrjdyZPnanWkzBfPveGi2b_cIAmazyvkvdRLCWxqgyTBsEpjIW8QGXYRjTKgKWQ2u7FQok9SEfywOMaX9sYOTxAWzoxkmc0Bputj4pG_Dc6ZEmUhyrAoa-POYnL05HoQu5mYcwcK7DerVjkRLw_BDart1DIX=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEiZsgUcVCEgCMPntaeOxGVW4vUMdsR3vrjdyZPnanWkzBfPveGi2b_cIAmazyvkvdRLCWxqgyTBsEpjIW8QGXYRjTKgKWQ2u7FQok9SEfywOMaX9sYOTxAWzoxkmc0Bputj4pG_Dc6ZEmUhyrAoa-POYnL05HoQu5mYcwcK7DerVjkRLw_BDart1DIX)

把原有的内容全部删掉

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEhQDPoDkOnEBdU5XYRu3HqsgltaYbm5mFAHW156M_mipznfuktozLpKwb-3Wx-h3jkQBRGUCtiZL1Yt2NylmaGJ7unYlYJc1UvfBDhNXZbkzOz4UcuUJE9DTpPW5kMGxcC1pw9VFz1T9_xqCILShmsyfqnFYxhzi0LEJBkilQch7vGt0gs9FpaFhtDI=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEhQDPoDkOnEBdU5XYRu3HqsgltaYbm5mFAHW156M_mipznfuktozLpKwb-3Wx-h3jkQBRGUCtiZL1Yt2NylmaGJ7unYlYJc1UvfBDhNXZbkzOz4UcuUJE9DTpPW5kMGxcC1pw9VFz1T9_xqCILShmsyfqnFYxhzi0LEJBkilQch7vGt0gs9FpaFhtDI)

换成：[https://github.com/crazypeace/Url-Shorten-Worker/blob/main/worker.js](https://github.com/crazypeace/Url-Shorten-Worker/blob/main/worker.js) 的内容

#### 保存并部署

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEjC_7tMH4LcpVUlggbN8k8yg1GMa1zfHIle5htJDmhCCHY8Nt0mZ_mjp1-oqQnSulpE2suMxYdDLB-ZZyiRzlo7ff_DFjUKO1EQV_aBjKtqkZ_RzTDDAyDBp8DYfB7yK9lr0FM6rjhN1dR09Qpz7T1_lbtjLBU2FzA7MpvMvNr0aFYTXqoJvBeZYaPg=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEjC_7tMH4LcpVUlggbN8k8yg1GMa1zfHIle5htJDmhCCHY8Nt0mZ_mjp1-oqQnSulpE2suMxYdDLB-ZZyiRzlo7ff_DFjUKO1EQV_aBjKtqkZ_RzTDDAyDBp8DYfB7yK9lr0FM6rjhN1dR09Qpz7T1_lbtjLBU2FzA7MpvMvNr0aFYTXqoJvBeZYaPg)

======

如果要当网络记事本 PasteBin

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEjAzfkAS4GS8MOIZQO-WapAv9iCKB6hdhvcCvHyvDzonQifYqN2N7CmR7yqBZc-FobmbVQaRrSrDm35-1tpASnfVLsBl-MM_RVomtTKntb2xRYMVIgtnMhgmDtS0I4zSag-C7TdVlAeZo_O8aWx_9zuXAfCoD7fMT7KVR_LjnbCJk6UaXl4KD28k42Fz2A=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEjAzfkAS4GS8MOIZQO-WapAv9iCKB6hdhvcCvHyvDzonQifYqN2N7CmR7yqBZc-FobmbVQaRrSrDm35-1tpASnfVLsBl-MM_RVomtTKntb2xRYMVIgtnMhgmDtS0I4zSag-C7TdVlAeZo_O8aWx_9zuXAfCoD7fMT7KVR_LjnbCJk6UaXl4KD28k42Fz2A)

如果要当图床 Image Hosting

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEjslxdGW6ur_FlRnaBJOQLtBqjpFGJ9s2hPSd3BolOBuOZY2y-UG67sMLS2giOqkV1Jw4gyHYzPplcIKylGwDveDTgwwApwxNWCfv5GGsIf7OZDU7eZoS5RnQ6AMhtB1QY6oe9qke0-CyJ7qcIdM8QT1FqMjg08aunDz5D2gW0lYiTQ-U8_MjHuL-Cg1Ig=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEjslxdGW6ur_FlRnaBJOQLtBqjpFGJ9s2hPSd3BolOBuOZY2y-UG67sMLS2giOqkV1Jw4gyHYzPplcIKylGwDveDTgwwApwxNWCfv5GGsIf7OZDU7eZoS5RnQ6AMhtB1QY6oe9qke0-CyJ7qcIdM8QT1FqMjg08aunDz5D2gW0lYiTQ-U8_MjHuL-Cg1Ig)

如果要当网络日记本, 支持 MarkDown

[![img](https://blogger.googleusercontent.com/img/a/AVvXsEissDi6uoPnVJWV30MxDOFu4jEdOnBbtrGjKNnh0_1z6s-gNXi96M-b0lIBTDCb5BSyzzTT_QotEDia4m20kte1wrASVGhIePKyloL1rGEhmqncBAnAtnAUsvJYC737-TxF6p0EeLLU4U2zHmFHZxxE6gR6k2Xa80rzAjTlkXEY8YgwY1s3dd0SlNqvkDQ=s16000)](https://blogger.googleusercontent.com/img/a/AVvXsEissDi6uoPnVJWV30MxDOFu4jEdOnBbtrGjKNnh0_1z6s-gNXi96M-b0lIBTDCb5BSyzzTT_QotEDia4m20kte1wrASVGhIePKyloL1rGEhmqncBAnAtnAUsvJYC737-TxF6p0EeLLU4U2zHmFHZxxE6gR6k2Xa80rzAjTlkXEY8YgwY1s3dd0SlNqvkDQ)

======

#### 完

要访问 你的 worker 域名/yejiandianci 来打开使用页面

如：[https://snowy-disk-fd82.ciys.workers.dev/yejiandianci](https://snowy-disk-fd82.ciys.workers.dev/yejiandianci)

[参考视频](https://www.youtube.com/embed/4ABLdshNOMA)

======

### 后记

你可以通过[在你自己的域名下 worker 页面添加一个路由指向 worker](https://zelikk.blogspot.com/2022/05/domain-cloudflare-worker-dev.html)的方式来实现比如 [https://1way.eu.org/mtSzm6](https://1way.eu.org/mtSzm6) 替代 snowy-disk-fd82.ciys.workers.dev/yejiandianci 的效果。

======

### 开发记录

[直接访问域名返回 404。在 KV 中设置一个 entry，保存秘密 path，只有访问这个 path 才显示使用页面](https://zelikk.blogspot.com/2022/07/url-shorten-worker-hide-tutorial.html)

[支持自定义短链](https://zelikk.blogspot.com/2022/07/url-shorten-worker-custom.html)

[API 不公开服务](https://zelikk.blogspot.com/2022/07/url-shorten-worker-api-password.html)

[页面缓存设置过的短链](https://zelikk.blogspot.com/2022/08/url-shorten-worker-localstorage.html)

[长链接文本框预搜索 localStorage](https://zelikk.blogspot.com/2022/08/url-shorten-worker-bootstrap-list-group-oninput.html)

[增加删除某条短链的按钮](https://zelikk.blogspot.com/2022/08/url-shorten-worker-delete-kv-localstorage.html)

[访问计数功能 可查询短链 成为功能完整的短链 API 系统](https://zelikk.blogspot.com/2023/11/url-shorten-worker-visit-count-api-api.html)

[阅后即焚功能, 可制作一次性二维码](https://zelikk.blogspot.com/2023/11/url-shorten-worker-snapchat-mode.html)

[增加读取 KV 中全部记录的功能](https://zelikk.blogspot.com/2024/01/url-shorten-worker-load-cloudflare-kv.html)

[变身网络记事本 Pastebin](https://zelikk.blogspot.com/2024/01/url-shorten-worker-pastebin.html)

[变身图床 Image Hosting](https://zelikk.blogspot.com/2024/01/url-shorten-worker-image-hosting-base64.html)

[变身日记本 NetJournal 支持 Markdown 一](https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal.html)
[变身日记本 NetJournal 支持 Markdown 二](https://zelikk.blogspot.com/2024/02/url-shorten-worker-netjournal-markdown.html)
