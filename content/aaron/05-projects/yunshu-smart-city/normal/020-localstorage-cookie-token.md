---
id: yunshu-smart-city-normal-020-localstorage-cookie-token
title: Token 为什么存在 localStorage，而不是 HttpOnly Cookie？
aliases: [能具体解释一下Token 为什么存在 localStorage，而不是 HttpOnly Cookie吗？, 从设计取舍看，Token 为什么存在 localStorage，而不是 HttpOnly Cookie？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [localStorage, HttpOnly Cookie, Token, XSS, Redux]
---

# Token 为什么存在 localStorage，而不是 HttpOnly Cookie？

## 核心回答

代码通过 redux-persist 使用默认 Web Storage 持久化整个 Redux 根状态，所以 Token 实际会进入 localStorage。好处是刷新后能恢复会话，请求拦截器也容易读取；代价是 JavaScript 可访问，XSS 风险更高。生产安全要求更高时，我会优先采用服务端设置的 Secure、HttpOnly、SameSite Cookie，让前端脚本读不到 Token，同时配套 CSRF 防护；如果继续用内存 Token，就用短期访问令牌和受保护的刷新 Cookie。当前方案只能说实现方便，不能说更安全。

## 回答要点

- 代码通过 redux-persist 使用默认 Web Storage 持久化整个 Redux 根状态，所以 Token 实际会进入 localStorage。
- 好处是刷新后能恢复会话，请求拦截器也容易读取；
- 代价是 JavaScript 可访问，XSS 风险更高。
- 生产安全要求更高时，我会优先采用服务端设置的 Secure、HttpOnly、SameSite Cookie，让前端脚本读不到 Token，同时配套 CSRF 防护；

## 面试官可能追问

- 关于“Token 为什么存在 localStorage，而不是 HttpOnly Cookie”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [store/index.ts，第 1～18 行](/Users/aaron/personal-hub/apps/project-1/src/store/index.ts:1)：redux-persist 使用默认 storage 持久化整个根 reducer。
> - [authSlice.tsx，第 5～26 行](/Users/aaron/personal-hub/apps/project-1/src/store/slice/authSlice.tsx:5)：Token 位于被持久化的鉴权状态中。
> - [request.ts，第 17～26 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:17)：请求发送前从 Redux 读取当前 Token。
