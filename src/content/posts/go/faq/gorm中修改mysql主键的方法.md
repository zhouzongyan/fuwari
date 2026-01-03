---
title: "Gorm中修改mysql主键的方法"
description: "gorm中修改mysql主键的方法"
id: "gorm-mysql-change-id"
published: 2024-06-04T09:12:25+08:00
lastmod: 2024-06-04T09:12:25+08:00

categories: Golang
tags:
  - go
  - gorm

# 原文作者
# Post's origin author name
#author:
# 原文链接
# Post's origin link URL
#link:
# 图片链接，用在open graph和twitter卡片上
# Image source link that will use in open graph and twitter card
#imgs:
# 在首页展开内容
# Expand content on the home page
#expand: true
# 外部链接地址，访问时直接跳转
# It's means that will redirecting to external links
#extlink:
# 在当前页面关闭评论功能
# Disabled comment plugins in this post
#comment:
#  enable: false
# 关闭文章目录功能
# Disable table of content
#toc: false
# 绝对访问路径
# Absolute link for visit
#url: "gorm中修改mysql主键的方法.html"
# 开启文章置顶，数字越小越靠前
# Sticky post set-top in home page and the smaller nubmer will more forward.
#weight: 1
# 开启数学公式渲染，可选值： mathjax, katex
# Support Math Formulas render, options: mathjax, katex
#math: mathjax
# 开启各种图渲染，如流程图、时序图、类图等
# Enable chart render, such as: flow, sequence, classes etc
#mermaid: true
---

### 一、为什么要修改mysql主键策略

1、我们创建mysql数据表的时候正常操作都是采用id自增类型,但是往往会造成以下几个问题
让别人可以猜到你数据库的数据量多少,甚至可以根据当前看到的id可以手动的修改浏览器上id来访问下一条数据
如果分表后会造成主键id是一样的
2、正常的做法可以修改mysql主键策略
直接使用uuid来作为主键,但是这样不好的地方是无序的,不会根据从前往后排列
使用雪花算法生成一个唯一的id
<!--more-->
### 二、gorm中修改mysql表主键的方法

1、直接使用数据表的hook方法,官网地址，直接在hook里面修改主键的值
2、使用gorm插件的方式全局修改,官网地址，官网上的案例似乎有点问题，自行验证

### 三、使用gorm插件来自定义主键

1、选用的雪花算法第三方库,链接地址

2、创建一个plugin.go的文件，我也不废话，直接贴上我自己定义的代码

```
package common

import (
 "fmt"
 "gin-admin-api/utils"
 "github.com/bwmarrin/snowflake"
 "gorm.io/gorm"
)

type DbFieldPlugin struct{}

func (op *DbFieldPlugin) Name() string {
 return "dbFieldPlugin"
}

func (op *DbFieldPlugin) Initialize(db *gorm.DB) (err error) {
 // 创建字段的时候雪花算法生成id
 db.Callback().Create().Before("gorm:create").Replace("id", func(db *gorm.DB) {
  node, _ := snowflake.NewNode(1)
  id := node.Generate()
  db.Statement.SetColumn("id", fmt.Sprintf("%d", id))
  accountId := db.Statement.Context.Value("accountId")
  //fmt.Println(accountId, "????")
  db.Statement.SetColumn("created_by", accountId)
 })
 // 创建人
 db.Callback().Create().Before("gorm:create").Replace("created_by", func(db *gorm.DB) {
  if db.Statement.Schema != nil {
   fmt.Println("创建的钩子函数")
   // 获取到上下文中数据
   accountId := db.Statement.Context.Value("accountId")
   fmt.Println(accountId, "????")
   db.Statement.SetColumn("created_by", accountId)
  }
 })
 // 更新人
 db.Callback().Update().Before("gorm:before_update").Replace("updated_by", func(db *gorm.DB) {
  if db.Statement.Schema != nil {
   fmt.Println("修改")
   accountId := db.Statement.Context.Value("accountId")
   db.Statement.SetColumn("updated_by", accountId)
  }
 })
 db.Callback().Update().Before("gorm:after_update").Replace("updated_by1", func(db *gorm.DB) {
  fmt.Println("更新后")
  fmt.Println(db.Statement.Model, "当前数据11")
  fmt.Println(utils.MapToJson(db.Statement.Dest), "当前数据21")
 })
 // 删除人
 db.Callback().Delete().Before("gorm:delete").Replace("deleted_by", func(db *gorm.DB) {
  if db.Statement.Schema != nil {
   accountId := db.Statement.Context.Value("accountId")
   fmt.Println("删除1111", accountId)
   db.Statement.SetColumn("deleted_by", accountId)
  }
 })
 return
}
```

3、使用插件

```
db.Use(&DbFieldPlugin{})
```
