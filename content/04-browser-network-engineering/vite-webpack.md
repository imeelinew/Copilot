---
id: engineering-vite-webpack
title: Vite 和 Webpack 有什么区别？
aliases: [vite为什么快, vite和webpack, 构建工具对比, 为什么选vite]
category: engineering
difficulty: 高频
priority: high
projects: [轻购, 城市视图]
keywords: [ESM, esbuild, HMR, Rollup, 预打包]
---

# Vite 和 Webpack 有什么区别？

## 30 秒回答

最大的差别在开发模式。Webpack 启动时要从入口把整个依赖图打包完才起 dev server，项目越大越慢；Vite 开发时直接利用浏览器原生 ESM，按需编译——请求到哪个模块才编译哪个，冷启动秒级，热更新只处理变更模块及其上游，速度快且稳定。生产构建 Vite 用 Rollup，产物成熟。我的项目全部用 Vite；Webpack 的价值在存量项目维护和更复杂的自定义打包需求。

## 标准回答

Webpack 是 bundle 模式：无论 dev 还是 build，都先把所有模块解析、转换、拼成 bundle。优点是生态和一致性——开发与生产的代码形态接近，问题早暴露；代价是冷启动和 HMR 的速度随项目体积增长而劣化。

Vite 把开发和生产拆开：开发时不起完整打包，只做两件事——用 esbuild 预打包 node_modules 里的依赖（把 CommonJS 转成 ESM、减少请求数，esbuild 是 Go 写的，快一到两个数量级），源码模块则由浏览器按需请求、Vite 按需编译转换。改一个文件时，HMR 只失效该模块到边界的部分，所以又快又稳定。生产再用 Rollup 打包，借助成熟的代码切分和 tree shaking。

配置层面我在项目里实际用到的：server.proxy 做开发代理解决跨域；resolve.alias 配路径别名；环境变量用 VITE_ 前缀并注意它会被打进客户端包，不能放密钥；构建时用 manualChunks 把第三方库分包，提高缓存命中。

选型上我的理解是：新项目默认 Vite，开发体验优势明显；Webpack 的不可替代场景是存量项目（迁移成本高）和需要深度定制 loader/plugin 链路的复杂构建。两者我没有从零配过 Webpack 生产项目，这是我工程化经历里需要诚实说明的部分。

## 回答要点

- 核心对比：bundle 模式 vs 原生 ESM 按需编译。
- 能说出 esbuild 预打包的两个原因（CJS 转 ESM、减少请求）。
- 配置经验落到 proxy、环境变量、分包这些真实用过的点上。

## 面试官可能追问

- 为什么开发环境要预打包依赖？
- Vite 生产构建为什么用 Rollup 而不是 esbuild？
- Vite 的 HMR 为什么比 Webpack 快且稳定？
