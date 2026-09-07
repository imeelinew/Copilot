---
id: browser-service-worker
title: Service Worker 能做什么，更新时有什么坑？
aliases: [PWA 缓存, service worker 生命周期, 离线缓存]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [Service Worker, PWA, Cache API, 离线]
---

# Service Worker 能做什么，更新时有什么坑？

## 核心回答

Service Worker 是浏览器和页面之间的一层代理，可以拦截请求、做缓存策略、支持离线页面和后台能力。它有 install、waiting、activate 等生命周期，缓存不是简单写进去就完事，版本更新和旧缓存清理都要设计。

最容易出问题的是把 HTML、接口和静态资源用同一种缓存策略。带 hash 的 JS 可以长缓存，入口 HTML 通常需要及时验证；接口数据可能要网络优先或 stale-while-revalidate。策略写错后，用户会一直看到旧页面，甚至拿到旧接口数据。

## 追问：新 Service Worker 为什么不立即生效？

旧页面仍在使用旧 worker，新 worker 会先 waiting，等旧页面都关闭后再接管。可以根据产品需要设计 skipWaiting 和 clientsClaim，但强行接管可能让同一页面的资源版本不一致，要谨慎。

## 追问：怎么避免缓存无限增长？

在 activate 阶段删除旧版本缓存，并给运行时缓存设置数量或时间上限。缓存 key 里如果带用户数据，要考虑用户切换和退出登录，不能把私人响应无条件缓存给下一个用户。

## 追问：为什么开发环境有时关掉缓存还不行？

Service Worker 本身仍可能拦截请求。需要在 Application 面板注销 worker、清理 Cache Storage，并确认页面确实重新注册了新版本。只按普通浏览器缓存处理，定位会绕远路。
