---
id: engineering-http-cache
title: 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？
aliases: [http缓存, cache-control, etag, 部署缓存更新, 304]
category: engineering
difficulty: 高频
priority: high
projects: [轻购]
keywords: [Cache-Control, ETag, 304, hash, Nginx]
---

# 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？

## 核心回答

强缓存是浏览器直接用本地那份，根本不发请求，由 Cache-Control 的 max-age 控制。协商缓存是发个请求问服务器资源变没变，拿 ETag 或 Last-Modified 对比，没变回个 304，变了才给新内容。

上线更新的问题我是配合构建解决的：Vite 打包出来的 JS、CSS 文件名带内容 hash，内容一变文件名就变，所以这些文件可以放心设很长很长的强缓存。而 index.html 不做强缓存，保证每次都能拿到新入口——新 HTML 引用新的资源文件名，用户自然就更新了。

## 展开回答

这个我真实踩过坑：有一次改了代码，线上死活不生效，查了半天发现是 HTML 也被强缓存了，用户一直拿旧入口，引用的自然还是旧资源。从那以后我对"更新不生效"的第一反应就是先看 HTML 的响应头。服务器上就是 Nginx 配置的事：HTML 单独走协商缓存，静态资源目录统一长缓存。

顺序上再强调一下：强缓存有效期内完全不发请求，过期了才走协商缓存，所以 304 省的是流量，请求本身还是发了一次。Service Worker 能做更细的离线和版本控制，我了解它的生命周期，项目里还没用上，会如实说。

## 面试官可能追问

- ETag 和 Last-Modified 同时存在以谁为准？
- 304 的完整交互过程？
- 用户停在页面上不刷新，怎么让他知道有新版本？
