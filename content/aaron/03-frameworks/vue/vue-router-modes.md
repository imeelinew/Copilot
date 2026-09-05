---
id: vue-router-modes
title: Vue Router 的 hash 和 history 模式有什么区别？
aliases: [路由模式, hash history, 路由404, createWebHistory]
category: vue
difficulty: 高频
priority: high
projects: [智服工单, 轻购]
keywords: [hash, history, pushState, 404, nginx]
---

# Vue Router 的 hash 和 history 模式有什么区别？

## 核心回答

hash 模式 URL 里带 #，比如 /#/list。# 后面的部分变化不会发起 HTTP 请求，靠监听 hashchange 事件切页面，后端完全不用管，随便部署到哪都能跑。

history 模式是干净的 URL，靠 pushState、replaceState 改地址不刷新页面。问题在于用户在 /list 这种路径上刷新时，浏览器会真的向服务器请求 /list，服务器没有这个文件就 404，所以后端必须做兜底，把所有路径都返回 index.html，nginx 配一条 try_files 就行。

我项目里默认用 history，URL 干净、分享和 SEO 都友好；部署环境动不了服务器配置时用 hash。

## 展开回答

Vue Router 4 里对应 createWebHashHistory 和 createWebHistory 两个创建函数。前端路由的本质两种模式是一致的：改 URL 但不发页面请求，然后渲染对应组件，差别只是改 URL 的手段和要不要服务器配合。

## 面试官可能追问

- history 模式刷新 404 怎么解决？
- 前端路由和后端路由的本质区别是什么？
- 你们项目用的哪种模式，为什么？
