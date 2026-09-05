---
id: css-pseudo-elements
title: 伪类和伪元素有什么区别？
aliases: [伪元素, 伪类, before after, 双冒号]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [伪类, 伪元素, before, after]
---

# 伪类和伪元素有什么区别？

## 核心回答

冒号的事先说清楚：CSS2 里伪元素就是一个冒号，CSS3 为了把伪类和伪元素区分开，规定伪元素用两个冒号。所以 ::before 和 :before 是同一个东西，双冒号是规范写法，浏览器保留单冒号是为了兼容老代码，CSS3 新增的比如 ::selection 就必须双冒号。我平时统一写双冒号。

概念上的区别：伪类选中的是处于某种状态的元素，比如 :hover、:focus、:first-child，元素本身是真实存在的；伪元素选中的是元素里原本不存在的部分，比如 ::before、::after 会在内容前后生成一个可以单独设样式的盒子，::first-line 选中第一行文字。

## 展开回答

常用场景：::after 用来清浮动、画装饰线和必填星号，::placeholder 改输入框占位符样式；伪类这边 :not() 和 :nth-child() 组合能省很多 JS。两个细节：伪元素必须有 content 属性才会渲染，一个元素也只有一对 before 和 after。

## 面试官可能追问

- 哪些伪元素必须写双冒号？
- :nth-child 和 :nth-of-type 有什么区别？
- 伪元素能被 JS 直接选中操作吗？
