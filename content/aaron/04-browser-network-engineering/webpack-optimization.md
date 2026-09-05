---
id: engineering-webpack-optimization
title: Webpack 层面能做哪些优化？
aliases: [webpack优化, 构建优化, 构建速度, 打包体积]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [tree-shaking, 分包, 压缩, 构建缓存]
---

# Webpack 层面能做哪些优化？

## 核心回答

优化分两个方向：让产物更小更快，让构建更快。产物上最常用的是压缩、拆包和 tree-shaking。压缩交给 TerserPlugin 这类工具；拆包是把 node_modules 里稳定的大依赖单独拆出去，业务代码再怎么改，这些文件名带 contenthash 不变，能一直吃缓存；tree-shaking 利用 ESM 静态结构的特点，把没用到的导出直接摇掉。

构建速度上，我的理解是别让工具做无用功：loader 的处理范围用 include、exclude 收窄，别拿 babel 去扫 node_modules；开持久化缓存，Webpack 5 自带文件缓存，二次构建快很多；开发环境用便宜的 sourcemap，别上全量 source-map。

## 展开回答

这些手段我在项目里大多是从 Vite 侧做的，思路是同一套：路由懒加载让页面按需出 chunk，manualChunks 把 React 和 ECharts 单独分包，组件库按需引入。配置名字不一样，原理相通。

还能补一个 CDN：把 output 的 publicPath 指到 CDN 地址，静态资源从 CDN 域名走，还能绕开浏览器对单域名并发请求数的限制。

## 面试官可能追问

- tree-shaking 什么情况下会失效？
- 分包按什么原则拆？
- 缓存为什么和 contenthash 有关？
