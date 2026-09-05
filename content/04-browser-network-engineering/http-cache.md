---
id: engineering-http-cache
title: 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？
aliases: [http缓存, cache-control, etag, 部署缓存更新, 304]
category: engineering
difficulty: 高频
priority: high
projects: [轻购, 城市视图]
keywords: [Cache-Control, ETag, 304, hash, Nginx]
---

# 强缓存和协商缓存的区别？上线后怎么让用户拿到新版本？

## 30 秒回答

强缓存是浏览器直接用本地副本，根本不发请求，由 Cache-Control 的 max-age 控制；协商缓存是浏览器发请求问服务器资源有没有变化，服务器对比 ETag 或 Last-Modified，没变就返回 304，变了才返回新内容。上线策略我是配合构建工具做的：Vite 打包的 JS 和 CSS 文件名带内容 hash，内容变文件名就变，可以放心设一年强缓存；HTML 不做强缓存，让用户每次都能拿到最新的入口，从而引用到新的资源文件。

## 标准回答

请求顺序上，浏览器先检查强缓存是否在有效期内，命中则不发请求（Network 里显示 from disk/memory cache）；过期后走协商缓存，携带 If-None-Match（对应 ETag）或 If-Modified-Since（对应 Last-Modified），服务器判断未变化返回 304，浏览器继续用本地副本，节省的是传输而不是请求。

部署上我依赖 Vite 的内容 hash 机制：构建产物形如 index-4a8b2c.js，内容一变 hash 就变。所以静态资源可以设很长的 max-age 加 immutable；而 index.html 是整个入口，必须设 no-cache 或较短的 max-age，保证它每次走协商缓存拿最新版本。这样用户下次访问时，新 HTML 引用新的资源地址，旧缓存自然失效。

这是我真实踩过坑的：早期不了解这个机制时，改了代码用户端不生效，后来检查发现是 HTML 也被强缓存了。所以我对"更新不生效"的第一反应就是看 HTML 的响应头。服务器端用 Nginx 控制：HTML 单独配置，静态资源目录统一长缓存。

Service Worker 能做更精细的离线与版本控制，我了解它的生命周期和缓存优先级，项目里还没用到，算是我计划深入的点。

## 回答要点

- 先讲清"强缓存不发请求、协商缓存问一次"的本质。
- 核心答案：内容 hash 资源长缓存 + HTML 不强缓存。
- 主动讲踩过的坑，把八股变成经验。

## 面试官可能追问

- ETag 和 Last-Modified 同时存在以谁为准？
- 304 的完整交互过程？
- 用户停留在页面上不刷新，怎么让他感知新版本？
