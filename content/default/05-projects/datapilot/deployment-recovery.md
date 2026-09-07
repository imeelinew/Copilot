---
id: datapilot-deployment-recovery
title: 城市视图发布后白屏或旧 chunk 失败怎么处理？
aliases: [城市视图部署, lazyWithRetry, chunk 加载失败]
category: datapilot
difficulty: 进阶
priority: normal
projects: [城市视图]
keywords: [Vite, dynamic import, lazyWithRetry, ErrorBoundary, CDN]
---

# 城市视图发布后白屏或旧 chunk 失败怎么处理？

## 核心回答

城市视图的路由页面是懒加载的，发布后旧页面可能还引用已经被清理的 chunk。`lazyWithRetry` 会自动重试一次，并用 sessionStorage 记录，避免失败时无限 reload；再由 `AppErrorBoundary` 给出刷新或回 dashboard 的兜底。排查时我会核对 HTML、chunk 响应、CDN 缓存、Service Worker 和部署版本，必要时保留旧产物或先回滚，不能只让用户反复刷新。

## 追问：为什么只自动刷新一次？

如果每次失败都 reload，网络断开或版本配置错误时会陷入循环，用户也看不到可操作的错误。一次重试足以处理短暂缓存不同步，仍失败就交给错误边界展示恢复入口并记录版本信息。更完整的发布流程还要让 HTML 短缓存、带 hash 的静态资源长缓存，并在切换版本时保留兼容窗口。

## 追问：构建后怎样做冒烟？

用生产构建启动静态服务，分别从新页面、旧页面和深链接进入 dashboard、图表编辑、地图和聊天，观察所有 dynamic import、API 代理和权限跳转。再模拟一个 chunk 404，确认重试只发生一次且错误边界可恢复。无法连接真实生产 CDN 时，我会把验证范围写清楚，不把本地 build 当成线上证明。

