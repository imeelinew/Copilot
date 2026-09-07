---
id: browser-indexeddb
title: localStorage、IndexedDB 和 Cache Storage 怎么选？
aliases: [浏览器存储选型, IndexedDB 使用场景]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [localStorage, IndexedDB, Cache Storage, 存储]
---

# localStorage、IndexedDB 和 Cache Storage 怎么选？

## 核心回答

我会先按数据性质来选，而不是先看 API 名字。localStorage 适合少量、同步读取的简单配置，但它会阻塞主线程，也只能存字符串；IndexedDB 适合较大的结构化业务数据和离线队列，读写是异步的；Cache Storage 更像给 Service Worker 用的请求响应缓存，适合离线页面和静态资源。登录态、购物车这类数据还要单独考虑 XSS 和一致性，不能因为“能存”就全部丢到浏览器里。

## 追问：为什么不把 Token 都放 localStorage？

localStorage 容易被同源脚本读取，一旦页面存在 XSS，Token 可能被直接带走。更稳妥的选择通常是短期内存 Token 配合 HttpOnly、Secure、SameSite Cookie，具体还要结合后端认证方案。如果项目只能用 localStorage，我至少会限制权限、缩短有效期、做好输出编码和 CSP，并在退出时清理。

## 追问：IndexedDB 失败时怎么办？

我会把它当成可选缓存，而不是唯一真相。初始化失败、用户清理存储或浏览器不支持时，页面仍然走网络请求；写入失败要记录可观测信息，但不能让主流程一直卡住。离线队列还要有版本号、幂等键和冲突处理，重新联网时按顺序重放。

