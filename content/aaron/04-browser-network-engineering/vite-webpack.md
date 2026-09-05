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

## 核心回答

核心差别在开发模式。Webpack 是把整个项目的依赖图打包完才起 dev server，项目大了启动就慢；Vite 开发时不打包，利用浏览器原生的 ES Module，请求到哪个文件才编译哪个，所以冷启动很快，热更新也只处理改动的那一块，又快又稳。

生产构建 Vite 用的是 Rollup，产物是成熟的。我的项目全用的 Vite。Webpack 我没从零搭过生产项目，这个会如实说，但读 Webpack 项目、改它的配置没问题。

## 展开回答

Vite 开发时还有一步预打包值得说：用 esbuild 把 node_modules 里的依赖先转成 ESM 并合并成大文件。原因是很多依赖是 CommonJS 格式浏览器不认，而且一个依赖内部可能有几百个小文件，不合并的话浏览器得发几百个请求。esbuild 是 Go 写的，这一步快到基本无感。

配置层面我实际用过的：proxy 解决开发跨域、resolve.alias 配路径别名、manualChunks 把第三方库单独分包提高缓存命中。还有环境变量的 VITE_ 前缀——带这个前缀的变量会被打进客户端代码，所以密钥绝对不能放这，这个点我专门整理过。

## 面试官可能追问

- 为什么开发环境要预打包依赖？
- Vite 生产构建为什么用 Rollup？
- Vite 的 HMR 为什么快？
