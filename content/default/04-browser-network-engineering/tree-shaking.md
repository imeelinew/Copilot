---
id: engineering-tree-shaking
title: tree-shaking 为什么有时失效？
aliases: [tree shaking, sideEffects, 动态导入]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [tree-shaking, ESM, sideEffects, 循环依赖]
---

# tree-shaking 为什么有时失效？

## 核心回答

tree-shaking 依赖构建器能静态分析 ESM 的 import/export，并确认未使用代码没有副作用。CommonJS、动态拼接模块路径、顶层注册或错误的 `sideEffects` 配置都会让构建器不敢删除；循环依赖也可能改变初始化顺序。排查时看构建分析报告和实际产物，不要只看“用了 ESM”就断言体积一定变小。

## 追问：sideEffects 写错会怎样？

把有副作用的 CSS 导入、polyfill 或注册代码误标成无副作用，可能被整个删掉，页面看起来像“样式偶尔丢了”。反过来把所有文件都标成有副作用，则体积变大。应该按包的真实入口和文件类型配置，并用构建产物和运行时 smoke 验证。

## 追问：动态 import 一定能减小首屏吗？

只有被拆出的模块不在首屏执行，且入口确实按需触发，才会减少初始传输和解析。预加载、共享依赖、缓存和用户很快就会打开的页面也会影响实际收益。优化前后要比较首屏资源、脚本执行和 LCP/INP，不能只看 chunk 数量。

