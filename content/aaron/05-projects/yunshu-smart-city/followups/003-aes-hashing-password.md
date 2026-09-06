---
id: yunshu-smart-city-followup-003-aes-hashing-password
title: 追问：密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？
aliases: [能具体解释一下密码用了什么加密？为什么不用 AES、MD5 或 SHA-256吗？, 从设计取舍看，密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [AES, 密码哈希, 登录鉴权, HTTPS]
---

# 追问：密码用了什么加密？为什么不用 AES、MD5 或 SHA-256？

## 核心回答

当前前端没有对密码做 AES、MD5 或 SHA-256，登录时提交的是表单中的密码值；密码框显示成圆点只是遮挡界面，不是加密。这里要把传输和存储分开：传输应该依赖 HTTPS，服务端保存密码则应该使用带随机盐和成本参数的专用密码哈希，例如 Argon2id 或 bcrypt。AES 可以还原明文，不适合作为普通登录密码的主要存储方式；MD5 和单次 SHA-256 计算太快，面对撞库和暴力破解时成本太低。当前目录没有服务端代码，所以我不能说后端实际使用了哪种算法；部署重写还指向 HTTP 上游，这也是需要改成 HTTPS 的链路风险。

## 回答要点

- 当前前端没有对密码做 AES、MD5 或 SHA-256，登录时提交的是表单中的密码值；
- 密码框显示成圆点只是遮挡界面，不是加密。
- 这里要把传输和存储分开：传输应该依赖 HTTPS，服务端保存密码则应该使用带随机盐和成本参数的专用密码哈希，例如 Argon2id 或 bcrypt。
- AES 可以还原明文，不适合作为普通登录密码的主要存储方式；

## 面试官可能追问

- 关于“密码用了什么加密？为什么不用 AES、MD5 或 SHA-256”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [Login.tsx，第 33～47 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：登录密码作为接口参数提交，没有前端加密步骤。
> - [Register.tsx，第 33～43 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Register.tsx:33)：注册密码的前端提交路径。
> - [Profile.tsx，第 90～96 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Profile.tsx:90)：修改密码的前端提交路径。
> - [vercel.json，第 2～6 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：生产重写配置中的上游地址使用 HTTP。
