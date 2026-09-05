---
id: css-link-import
title: link 和 @import 引入 CSS 有什么区别？
aliases: [link import区别, 样式引入方式]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [link, import, 样式加载]
---

# link 和 @import 引入 CSS 有什么区别？

## 核心回答

link 是 HTML 标签，写在 head 里，浏览器解析到就和页面其他资源并行去下载；@import 是 CSS 语法，要等宿主样式文件下载解析完，才会再去请求它引入的样式，请求是一环套一环串行的，网络慢的时候页面容易出现一瞬间的无样式闪烁。论加载性能，link 明显更好。

能力上 link 也更广：它是通用资源标签，stylesheet、icon、preload 都靠它，JS 还能动态创建和移除；@import 只能引样式。现在工程里样式基本由打包器处理成 CSS 文件自动插 link，CSS 原生 @import 已经很少手写了。

## 展开回答

有个容易混淆的点：Sass 里也有 @import，但那是编译期把文件合并进产物，编译完就不存在了，和浏览器里的 CSS @import 完全是两码事。这题的价值主要在理解资源加载时序对首屏的影响。

## 面试官可能追问

- @import 为什么会拖慢样式加载？
- Sass 的 @import 和 CSS 的 @import 区别？
- 样式文件放 body 底部行不行？
