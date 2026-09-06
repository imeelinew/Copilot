---
id: yunshu-smart-city-normal-033-password-logging
title: 密码链路和日志还有安全边界
aliases: [请介绍一下项目中的密码链路和日志还有安全边界。, 你在密码链路和日志还有安全边界方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, Token, 密码哈希, HTTPS, 同源代理]
---

# 密码链路和日志还有安全边界

## 核心回答

当前登录页会把完整登录响应打印到控制台，密码由前端表单直接交给接口，部署重写指向 HTTP 上游。当响应里含有 Token、平台到上游的链路可被观察，或者生产环境保留调试日志时，可能扩大敏感信息暴露面。改进时应删除登录响应日志，把代理上游升级为 HTTPS，并由服务端使用可靠的加盐单向哈希保存密码；前端只做输入和交互校验。面试时我会明确说前端代码看不到服务端哈希方式，也没有证据表明风险已经在线上造成故障。

## 回答要点

- 当前登录页会把完整登录响应打印到控制台，密码由前端表单直接交给接口，部署重写指向 HTTP 上游。
- 当响应里含有 Token、平台到上游的链路可被观察，或者生产环境保留调试日志时，可能扩大敏感信息暴露面。
- 改进时应删除登录响应日志，把代理上游升级为 HTTPS，并由服务端使用可靠的加盐单向哈希保存密码；
- 前端只做输入和交互校验。

## 面试官可能追问

- 关于“密码链路和日志还有安全边界”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [Login.tsx，第 33～54 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Login.tsx:33)：提交密码并打印登录响应和错误。
> - [auth.ts，第 4～10 行](/Users/aaron/personal-hub/apps/project-1/src/api/auth.ts:4)：登录接口调用。
> - [vercel.json，第 2～6 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：接口重写到 HTTP 上游。
