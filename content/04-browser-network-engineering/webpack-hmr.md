---
id: engineering-webpack-hmr
title: Webpack 热更新（HMR）的原理？
aliases: [热更新, HMR, 热替换, 模块热更新]
category: engineering
difficulty: 高频
priority: normal
projects: []
keywords: [HMR, websocket, 热替换, dev server]
---

# Webpack 热更新（HMR）的原理？

## 核心回答

HMR 就是改动代码后不刷新整页，只把变化的模块换成新的，页面状态还留着。实现上依赖两样东西：dev server 和浏览器端 runtime 之间有一条 WebSocket 长连接，负责实时通信。

文件一保存，Webpack 增量编译出改动后的模块，把新的 hash 通过 WebSocket 推给浏览器；浏览器发现 hash 变了，先要一份更新清单看哪些模块变了，再把这些新模块的代码拉下来。

拉下来之后由 HMR 运行时做替换：旧模块下掉、新模块执行，并触发模块里注册的 accept 回调，所以样式、组件的更新基本是无感的。要是模块不接受更新或者替换时报错，就退回 live reload，整页刷新兜底。

## 展开回答

HMR 和 live reload 是两回事：live reload 也会自动刷新，但状态全丢；HMR 的价值是保留状态，比如表单填了一半还在。改了配置文件或者模块不支持热替换时，才会退回刷新。

这套机制 Vite 也在用，只是更轻：开发时不打包，改哪个文件就只编译那个模块，通过 WebSocket 通知浏览器用原生 ESM 直接换掉它，所以热更新快得几乎无感。

## 面试官可能追问

- HMR 和 live reload 有什么区别？
- 为什么改 CSS 不用刷新页面？
- HMR 失败了会怎样？
