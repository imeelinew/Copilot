---
id: engineering-bundler-comparison
title: Webpack 和 gulp、Rollup 这类工具有什么区别？
aliases: [构建工具对比, gulp区别, rollup区别, 打包工具选型]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [gulp, rollup, vite, 任务流]
---

# Webpack 和 gulp、Rollup 这类工具有什么区别？

## 核心回答

思路上最大的差别是"任务流"和"依赖图"。gulp、grunt 是任务流思路：把构建过程拆成一个一个任务，文件像流水线一样流过去做链式处理，适合压图片、编译 CSS 这种单点的自动化任务，现在偶尔还拿 gulp 单独处理静态资源。

Webpack 是依赖图思路：给一个入口，它顺着 import 把整个项目的关系摸出来，一切文件都是模块，配 loader 和 plugin 做处理和扩展，适合打大型应用。Rollup 也走依赖图，但更纯粹：只认 ESM，tree-shaking 干得最干净，产物里没那么多运行时包裹的代码，所以开源库基本都用它打，Vue 和 React 自己的产物就是 Rollup 出的。

## 展开回答

现在应用侧主流其实是 Vite：开发时不打包，直接用浏览器原生 ESM 按需加载，生产构建用 Rollup 出包，等于把开发体验和库级的打包质量拼到了一起，我的项目全是 Vite。

一句话给边界：打应用用 Webpack 或 Vite，打库用 Rollup，零散的自动化任务用 gulp。

## 面试官可能追问

- 为什么打库喜欢用 Rollup？
- Vite 开发快，为什么生产不用 esbuild 打包？
- gulp 现在还有使用场景吗？
