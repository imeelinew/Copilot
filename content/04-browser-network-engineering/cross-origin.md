---
id: engineering-cross-origin
title: 什么是跨域？你是怎么解决的？
aliases: [跨域怎么解决, 同源策略, cors, 开发环境代理]
category: engineering
difficulty: 高频
priority: high
projects: [轻购]
keywords: [同源策略, CORS, 预检, Vite proxy, Nginx]
---

# 什么是跨域？你是怎么解决的？

## 核心回答

同源策略要求协议、域名、端口全一样，有一个不一样就是跨域。这时候 fetch 或 XHR 请求其实发出去了，服务端也可能正常处理了，但浏览器把响应拦住不给脚本用。它就是浏览器的安全机制——用 Postman 发同样的请求没事，因为 Postman 没有同源策略。

解决分环境。开发时前后端端口不一样，在 Vite 里配个 proxy，把 /api 转发到后端地址，浏览器看到的就是同源请求。生产环境我的项目是用 Nginx 反代，页面和接口挂在同一个域名下，从根上就没有跨域。真要分开域名，就得后端配 CORS 响应头。

## 展开回答

有两个常被追问的点。一是预检：带 Authorization 这种自定义头的请求，浏览器会先发一个 OPTIONS 问服务器允不允许，通过了才发真正的请求，所以调试跨域要看 OPTIONS 过没过。二是跨域和 CSRF 是两回事：跨域限制的是"读响应"，CSRF 是借用户的登录态发请求，同源策略根本挡不住它，得靠 SameSite 这些 Cookie 策略。

排查的时候我不会上来就说"这是跨域"，会看 Network 里响应头有没有 CORS 字段、预检是否通过，确认了再说。

## 面试官可能追问

- 哪些请求会触发预检？
- Nginx 反代为什么就没有跨域了？
- 前端带 Cookie 跨域要开什么？

## 代码证据

- /Users/eli/Dev/mobile-shop/vite.config.ts：server.proxy
