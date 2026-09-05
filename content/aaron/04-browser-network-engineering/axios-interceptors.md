---
id: engineering-axios-interceptors
title: Axios 请求模块和 Token 鉴权是怎么封装的？
aliases: [axios封装, token鉴权, 请求拦截器, 响应拦截器, 401怎么处理]
category: engineering
difficulty: 项目
priority: high
projects: [轻购, 城市视图, 智服工单]
keywords: [Axios, Authorization, Bearer, 401, 路由守卫]
---

# Axios 请求模块和 Token 鉴权是怎么封装的？

## 30 秒回答

我会先创建统一的 Axios 实例，配置 baseURL 和超时时间。请求拦截器从本地读取 Token，存在时放进 Authorization 请求头；响应拦截器统一解包数据并处理 401。Token 失效时清除会话、跳转登录页，同时保存原地址，登录成功后再返回原页面。

## 标准回答

我的做法是把请求的通用逻辑集中到一个 Axios 实例中，而不是每个页面重复处理。

请求拦截器会读取 Token，并按照 Bearer Token 的格式放到 Authorization 头中。响应成功时统一返回业务数据；如果后端返回 HTTP 401，或者返回约定的登录失效业务码，就清除本地 Token 并跳转登录页。

在轻购中我还保存了用户原本访问的完整地址，通过 redirect 参数传到登录页。登录成功后使用 router.replace 返回原页面，避免浏览器返回时再次进入登录页。同时增加 redirectingToLogin 标记，防止多个并发请求同时失败后重复跳转。

需要强调的是，前端路由守卫只改善用户体验，真正的权限校验仍然必须由后端完成。

## 回答要点

- 请求拦截器负责携带 Token。
- 响应拦截器集中处理失效和错误。
- 路由守卫不是安全边界。
- 登录回跳体现完整用户体验。

## 面试官可能追问

- Token 放 localStorage 有什么风险？
- 多个请求同时返回 401 怎么处理？
- refresh token 的流程如何设计？

## 代码证据

- /Users/eli/Dev/mobile-shop/src/utils/request.ts
- /Users/eli/Dev/mobile-shop/src/router/index.ts
