---
id: shiguangji-shop-followup-002-ai-key-localstorage-cookie
title: 追问：AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？
aliases: [能具体解释一下AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好吗？, 从设计取舍看，AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: high
projects: [拾光集移动商城系统]
keywords: [登录鉴权, AI Key, localStorage, HttpOnly Cookie, Token, 列表 Key]
---

# 追问：AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好？

## 核心回答

AI Key 是整个应用共用的调用凭据，登录 Token 是某个用户的访问凭据，两者用途不同，但都需要保护。当前把 accessToken 存在 localStorage，是为了让登录状态在刷新后保留，并让 Axios 请求拦截器方便地读取，再放进 Authorization。缺点是页面 JavaScript 也能读取它，如果页面出现 XSS，Token 可能受到影响。

更完整的方案可以让服务端维护会话，通过 HttpOnly、Secure 和合适 SameSite 的 Cookie 交接。这样 JavaScript 不能直接读取 Cookie，但仍要处理 CSRF，而且 XSS 仍可能在用户页面内代发请求。当前商城代理不会把浏览器 Cookie 转发给上游，所以这不是改一个存储 API 就能完成的，需要前后端一起调整认证流程。

## 回答要点

- AI Key 是整个应用共用的调用凭据，登录 Token 是某个用户的访问凭据，两者用途不同，但都需要保护。
- 当前把 accessToken 存在 localStorage，是为了让登录状态在刷新后保留，并让 Axios 请求拦截器方便地读取，再放进 Authorization。
- 缺点是页面 JavaScript 也能读取它，如果页面出现 XSS，Token 可能受到影响。
- 更完整的方案可以让服务端维护会话，通过 HttpOnly、Secure 和合适 SameSite 的 Cookie 交接。

## 面试官可能追问

- 关于“AI Key 已经移到服务端，登录 Token 为什么还放在 localStorage？Cookie 会不会更好”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

> - [Token 存取第 1～10 行](/Users/aaron/personal-hub/apps/project-2/src/utils/auth.ts:1)：localStorage 中 Token 的保存、读取和删除。
> - [request.ts 第 27～36 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：把 Token 注入 Authorization。
> - [商城代理第 39～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:39)：只转发白名单请求头，不转发 Cookie。
> - 原理参考：[OWASP 浏览器存储安全](https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html)、[MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)。
