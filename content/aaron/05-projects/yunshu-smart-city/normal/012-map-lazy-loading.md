---
id: yunshu-smart-city-normal-012-map-lazy-loading
title: 页面懒加载、接口代理和地图资源配置
aliases: [请介绍一下项目中的页面懒加载、接口代理和地图资源配置。, 你在页面懒加载、接口代理和地图资源配置方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [同源代理, 高德地图, 路由懒加载, React, 列表 Key]
---

# 页面懒加载、接口代理和地图资源配置

## 核心回答

工程入口把各业务页面用 `React.lazy` 按路由拆分，并用 `Suspense` 提供加载占位，这样用户第一次进入系统时不需要同步加载所有页面代码。开发环境统一请求 `/api`，由 Vite 代理到服务端；部署配置同样把 `/api` 重写到后端，并把其他路径回退到 `index.html`，保证刷新前端路由时还能进入单页应用。高德安全配置从 Vite 环境变量注入页面。这里能确认的是代码仓库中存在这些配置，不能只根据配置文件断言部署平台、代理链路和环境变量已经在线上正确生效。另一个边界是当前代理目标使用 HTTP，部署平台到上游之间的数据传输没有在这个配置中体现 TLS 保护。

## 回答要点

- 工程入口把各业务页面用 React.lazy 按路由拆分，并用 Suspense 提供加载占位，这样用户第一次进入系统时不需要同步加载所有页面代码。
- 开发环境统一请求 /api，由 Vite 代理到服务端；
- 部署配置同样把 /api 重写到后端，并把其他路径回退到 index.html，保证刷新前端路由时还能进入单页应用。
- 高德安全配置从 Vite 环境变量注入页面。

## 面试官可能追问

- 关于“页面懒加载、接口代理和地图资源配置”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [router/index.tsx，第 6～27 行](/Users/aaron/personal-hub/apps/project-1/src/router/index.tsx:6)：页面级懒加载和统一 Suspense 占位。
> - [vite.config.ts，第 32～61 行](/Users/aaron/personal-hub/apps/project-1/vite.config.ts:32)：高德安全配置注入、开发代理和路径别名。
> - [amap.ts，第 1～4 行](/Users/aaron/personal-hub/apps/project-1/src/config/amap.ts:1)：运行时高德安全密钥配置。
> - [vercel.json，第 2～10 行](/Users/aaron/personal-hub/apps/project-1/vercel.json:2)：生产接口重写和单页应用路由回退配置。
