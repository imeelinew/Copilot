---
id: shiguangji-shop-normal-019-localstorage-token
title: 为什么登录 Token 还放在 localStorage？
aliases: [能具体解释一下为什么登录 Token 还放在 localStorage吗？, 从设计取舍看，为什么登录 Token 还放在 localStorage？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [登录鉴权, localStorage, Token, HttpOnly Cookie, Axios, XSS]
---

# 为什么登录 Token 还放在 localStorage？

## 核心回答

当前这样做是为了刷新后保留登录状态，并让 Axios 拦截器方便地读取 Token。但它的缺点是页面 JavaScript 可以访问，一旦出现 XSS，Token 可能受到影响。更完整的方案可以由服务端维护会话，并使用 HttpOnly、Secure 和合适 SameSite 的 Cookie，不过需要服务端和代理整体配合，还要处理 CSRF，不能只把 `localStorage.setItem` 换成 Cookie 就结束。

## 回答要点

- 当前这样做是为了刷新后保留登录状态，并让 Axios 拦截器方便地读取 Token。
- 但它的缺点是页面 JavaScript 可以访问，一旦出现 XSS，Token 可能受到影响。
- 更完整的方案可以由服务端维护会话，并使用 HttpOnly、Secure 和合适 SameSite 的 Cookie，不过需要服务端和代理整体配合，还要处理 CSRF，不能只把 localStorage.setIt…

## 面试官可能追问

- 关于“为什么登录 Token 还放在 localStorage”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

[Token 存取第 1～10 行](/Users/aaron/personal-hub/apps/project-2/src/utils/auth.ts:1)、[请求注入第 27～36 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)、[富文本入口第 158～162 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:158)。
