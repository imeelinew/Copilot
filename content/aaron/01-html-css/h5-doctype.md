---
id: h5-doctype
title: DOCTYPE 是干什么的？
aliases: [doctype作用, 文档声明, 怪异模式, 标准模式]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [DOCTYPE, 标准模式, 怪异模式, 兼容模式]
---

# DOCTYPE 是干什么的？

## 核心回答

DOCTYPE 是文档类型声明，必须放在 HTML 文档的第一行，作用是告诉浏览器按哪套标准来解析和渲染页面。写了标准声明就进标准模式，按规范来；不写或者写错，浏览器会退回怪异模式，也叫混杂模式，模拟老浏览器的宽松行为。

怪异模式最直观的差别在盒模型：width 会把 padding 和 border 都算进去，另外图片下方间隙、行内元素对齐这些细节表现也不一样，样式会出现莫名其妙的偏差。HTML5 把声明简化成 <!DOCTYPE html> 一行，大小写无所谓，不用再引版本号。

## 展开回答

想确认当前模式可以看 document.compatMode，CSS1Compat 是标准模式，BackCompat 是怪异模式。顺带分清：JS 的严格模式是 'use strict'，管的是 JavaScript 语义，和文档模式的 DOCTYPE 完全是两码事。

## 面试官可能追问

- 怪异模式和标准模式具体差在哪？
- 不写 DOCTYPE 会发生什么？
- document.compatMode 了解吗？
