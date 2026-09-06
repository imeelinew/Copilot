---
id: yunshu-smart-city-normal-019-aes-password
title: 登录密码用了 AES 吗？为什么不用 AES？
aliases: [能具体解释一下登录密码用了 AES 吗？为什么不用 AES吗？, 从设计取舍看，登录密码用了 AES 吗？为什么不用 AES？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, AES, 地址管理, 验证方法, 密码哈希, HTTPS]
---

# 登录密码用了 AES 吗？为什么不用 AES？

## 核心回答

当前前端没有 AES 实现，密码作为登录 JSON 的一个字段交给接口；不能说项目已经做了前端密码加密，也看不到服务端是否使用 bcrypt、Argon2 之类的单向哈希。前端 AES 通常不能替代 HTTPS，因为密钥和算法都随前端代码下发，攻击者能复现加密过程；真正需要的是浏览器到服务端链路使用 HTTPS，服务端只保存加盐后的单向哈希，并做好限流和验证码。当前部署重写的上游地址还是 HTTP，这是应该改成 HTTPS 的风险点。

## 回答要点

- 当前前端没有 AES 实现，密码作为登录 JSON 的一个字段交给接口；
- 不能说项目已经做了前端密码加密，也看不到服务端是否使用 bcrypt、Argon2 之类的单向哈希。
- 前端 AES 通常不能替代 HTTPS，因为密钥和算法都随前端代码下发，攻击者能复现加密过程；
- 真正需要的是浏览器到服务端链路使用 HTTPS，服务端只保存加盐后的单向哈希，并做好限流和验证码。

## 面试官可能追问

- 关于“登录密码用了 AES 吗？为什么不用 AES”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [Login.tsx，第 33～47 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：密码和验证码作为登录参数提交，未见前端 AES。
> - [auth.ts，第 4～10 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录请求入口。
> - [vercel.json，第 2～6 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：部署重写使用 HTTP 上游地址。
