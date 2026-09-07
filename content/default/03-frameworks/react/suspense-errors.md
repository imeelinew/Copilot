---
id: react-suspense-errors
title: React 的懒加载失败和错误边界怎么处理？
aliases: [React lazy 错误边界, Suspense loading, chunk 加载失败]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [lazy, Suspense, ErrorBoundary, chunk]
---

# React 的懒加载失败和错误边界怎么处理？

## 核心回答

Suspense 负责组件还没准备好时显示 loading，错误边界负责渲染阶段或懒加载失败时显示兜底页面，它们解决的是两种不同状态。路由页面可以在边界里提供刷新和返回安全页面的按钮，不能让一块页面错误把整个应用变成白屏。

发布新版本时，旧页面可能还在请求已经被删除的 chunk。可以只对识别出的 chunk 错误自动刷新一次，并用 sessionStorage 记录是否已经重试过；如果仍失败，就让错误边界提供手动刷新，避免无限刷新循环。

## 追问：错误边界能捕获事件处理器里的异常吗？

不能自动捕获所有事件回调和异步 Promise 错误。事件处理器需要自己 try/catch 或交给请求层，错误边界主要捕获子树渲染、生命周期和构造过程中的错误。不同来源要分别处理。

## 追问：Suspense 能自动处理所有请求吗？

不能。它需要数据层或框架把“等待”接入 Suspense 协议，普通 useEffect fetch 不会自动让最近的 Suspense fallback 出现。项目要明确采用哪种数据获取方式。

## 追问：为什么错误页面要有 resetKey？

用户切换路由或数据范围后，原来的错误上下文可能已经失效。用稳定的 key 变化触发边界重置，可以让新页面重新尝试加载，而不是一直停在旧错误上。
