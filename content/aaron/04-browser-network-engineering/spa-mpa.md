---
id: engineering-spa-mpa
title: 单页应用和多页应用有什么区别？
aliases: [SPA, MPA, 多页配置, 单页应用]
category: engineering
difficulty: 基础
priority: normal
projects: [轻购, 城市视图]
keywords: [SPA, MPA, 路由, 多入口]
---

# 单页应用和多页应用有什么区别？

## 核心回答

SPA 只有一个 HTML 壳，页面切换靠 JS 改 DOM（路由驱动），数据全走接口，前后端分离。好处是切换流畅、体验接近原生 App；代价是首屏要下整个 JS 包，慢，而且 SEO 弱，因为内容是 JS 渲染出来的，爬虫不一定等得到。

MPA 是很多个 HTML，跳转就是整页刷新，SEO 天然好，开发模式偏传统模板。我的项目全是 SPA，首屏慢靠路由懒加载、骨架屏这些手段缓解，SEO 要求高的页面才考虑 SSR 方案。

配置层面，Webpack 里 SPA 就一个 entry；MPA 是 entry 写成对象、每个页面一个入口，再各配一份 HtmlWebpackPlugin，公共依赖用 splitChunks 抽出来，避免每个页面重复打包同一份代码。

## 展开回答

动态导入 import() 是 SPA 按需加载的关键：Webpack 内置支持，import() 引到的模块会单独出一个 chunk，代码跑到那一行才去加载文件，路由懒加载就是这么实现的。这也是 SPA 首屏体积问题的标准解法。

## 面试官可能追问

- SPA 首屏慢怎么优化？
- SPA 的 SEO 问题怎么解决？
- SSR 了解吗？
