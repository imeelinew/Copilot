---
id: engineering-cache-details
title: ETag、Last-Modified 和 stale-while-revalidate 怎么配合？
aliases: [HTTP 缓存细节, ETag, stale-while-revalidate]
category: engineering
difficulty: 进阶
priority: high
projects: []
keywords: [Cache-Control, ETag, Last-Modified, CDN, 缓存]
---

# ETag、Last-Modified 和 stale-while-revalidate 怎么配合？

## 核心回答

强缓存命中时浏览器直接用本地内容，不发请求；需要验证时会带 ETag 或 Last-Modified，服务端确认没变就返回 304，变了才传新内容。`stale-while-revalidate` 允许先给一份稍旧的缓存，同时后台验证更新，适合能容忍短暂旧数据的读接口。HTML、带 hash 的静态资源和用户私有数据的缓存策略不同，不能只看“缓存越久越快”。

## 追问：为什么带 hash 的 JS 可以长缓存？

内容变了文件名也变，旧文件仍能被旧 HTML 引用，所以静态资源可以 `immutable` 长缓存；HTML 则要短缓存或及时失效，保证用户拿到新入口。发布清理旧 chunk 太快会让停留在旧页面的用户加载失败，部署策略要保留兼容窗口。

## 追问：用户私有接口能不能放 CDN？

必须明确响应是否包含用户数据、Cookie、Authorization 和 Vary 规则。私有响应默认不共享缓存，若确实要缓存，要按用户或权限隔离并防止误命中。缓存键、失效和越权测试比“响应快了多少”更重要。

