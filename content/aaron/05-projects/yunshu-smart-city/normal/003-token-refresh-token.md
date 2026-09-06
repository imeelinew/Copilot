---
id: yunshu-smart-city-normal-003-token-refresh-token
title: Token 无感刷新
aliases: [请介绍一下项目中的Token 无感刷新。, 你在Token 无感刷新方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [Token, 登录鉴权, 组件设计, Redux]
---

# Token 无感刷新

## 核心回答

用户登录后不需要自己盯着 Token 什么时候过期。全局会话组件会解析 Token 的 `exp` 过期时间，在过期前 30 秒安排一次刷新；如果普通业务请求先收到 401，请求拦截层也会尝试刷新，再把原请求重放一次。为了避免一个页面同时发出很多请求时重复调用刷新接口，我用 single flight，也就是把正在进行的刷新 Promise 缓存在模块里，后来的请求直接等待同一个 Promise。刷新返回后还会比较当前 Redux 里的 Token，防止用户已经退出或切换账号时，迟到的旧响应又把登录状态写回来。这样设计解决的是会话连续性和并发刷新问题，但它仍依赖服务端允许使用尚未过期的 Token 刷新；Token 真正过期、刷新返回 401 或响应结构不完整时，系统会要求重新登录，而不是无限重试。

## 回答要点

- 用户登录后不需要自己盯着 Token 什么时候过期。
- 全局会话组件会解析 Token 的 exp 过期时间，在过期前 30 秒安排一次刷新；
- 如果普通业务请求先收到 401，请求拦截层也会尝试刷新，再把原请求重放一次。
- 为了避免一个页面同时发出很多请求时重复调用刷新接口，我用 single flight，也就是把正在进行的刷新 Promise 缓存在模块里，后来的请求直接等待同一个 Promise。

## 面试官可能追问

- 关于“Token 无感刷新”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [authToken.ts，第 1～58 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:1)：30 秒提前量、5 秒重试间隔、JWT 过期时间解析和重试条件。
> - [authToken.ts，第 60～72 行](/Users/aaron/personal-hub/apps/project-1/src/utils/authToken.ts:60)：single flight 共享进行中的刷新 Promise。
> - [authSession.ts，第 63～107 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:63)：独立刷新客户端、响应校验、迟到响应保护和单例刷新入口。
> - [request.ts，第 17～69 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:17)：每次请求读取最新 Token，刷新后只重放原请求一次。
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：同时处理 HTTP 401 和 HTTP 200 内的业务 401。
> - [SessionManager.tsx，第 27～114 行](/Users/aaron/personal-hub/apps/project-1/src/components/SessionManager.tsx:27)：过期弹窗、定时刷新、临时失败重试和定时器清理。
