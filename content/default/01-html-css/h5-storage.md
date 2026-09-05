---
id: h5-storage
title: cookie、localStorage、sessionStorage 有什么区别？
aliases: [本地存储, web storage, cookie区别, 存储方案]
category: html-css
difficulty: 必问
priority: high
projects: []
keywords: [cookie, localStorage, sessionStorage, 同源]
---

# cookie、localStorage、sessionStorage 有什么区别？

## 核心回答

cookie 定位最特殊，它是随请求自动带给服务器的：同源下每个 HTTP 请求都会背上它，所以适合存会话标识这种服务端要用的小数据，容量只有 4KB 左右，可以设过期时间。localStorage 是持久化的本地存储，5MB 起步，不会自动发给服务器，不手动删就一直留着。sessionStorage 容量和 localStorage 差不多，但生命周期挂在标签页上，页面关掉就清空，而且标签页之间不共享。

我的选法按数据性质来：要随请求给服务器的，比如会话凭证，走 cookie；跨会话还想留着的，比如主题偏好，用 localStorage；只活在本页面里的临时数据，比如多步表单的中间状态，用 sessionStorage。

## 展开回答

安全上 cookie 有几个属性要知道：HttpOnly 让 JS 读不到，能防 XSS 偷 cookie；Secure 限制只在 HTTPS 里携带；SameSite 控制跨站请求带不带，是防 CSRF 的手段。localStorage 是任何同源脚本都能读的，存敏感信息要慎重，而且它只存字符串，对象要自己 JSON 序列化。

## 面试官可能追问

- 项目的 token 一般存在哪，有什么风险？
- localStorage 存满了会怎样？
- cookie 太多太大会有什么影响？
