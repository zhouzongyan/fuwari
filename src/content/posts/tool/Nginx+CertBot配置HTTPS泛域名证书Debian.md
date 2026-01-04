---
title: Nginx+ CertBot配置HTTPS泛域名证书(Debian)
published: 2025-11-10
id: nginx-certbot-https
categories: 工具
---

# 安装 Nginx

```bash
apt install nginx
```

# 配置证书

```bash
# 1. 安装certbot
apt-get install certbot python3-certbot-nginx

# 2. 获取证书
# 自动配置, --nginx-server-root指定nginx配置文件目录
certbot --nginx --nginx-server-root /usr/local/nginx-1.23.3/conf
# 指定域名, example.com换成自己的域名
certbot --nginx -d example.com -d www.example.com


# 3. 自动续约
certbot renew --dry-run
```

执行完后 nginx.conf 会自动加上 SSL 相关配置

# 常见问题

问题一、第 2 步获取证书报错:

```
Error while running nginx -c /usr/local/nginx-1.25.4/conf/nginx.conf -t.

nginx: the configuration file /usr/local/nginx-1.25.4/conf/nginx.conf syntax is ok
2024/03/11 10:42:44 [emerg] 1985275#1985275: open() "/usr/share/nginx/logs/xxx_admin.access.log" failed (2: No such file or directory)
nginx: configuration file /usr/local/nginx-1.25.4/conf/nginx.conf test failed
```

创建`/usr/share/nginx/logs`目录， 重新执行第 2 步命令

问题二、执行`certbot --nginx --nginx-server-root /usr/local/nginx-1.23.3/conf`命令报错：

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
The nginx plugin is not working; there may be problems with your existing configuration.
The error was: NoInstallationError("Could not find a usable 'nginx' binary. Ensure nginx exists, the binary is executable, and your PATH is set correctly.",)
```

解决方案:

```bash
ln -s /usr/local/nginx-1.23.3/sbin/nginx /usr/bin/nginx
ln -s /usr/local/nginx-1.23.3/conf/ /etc/nginx
```
