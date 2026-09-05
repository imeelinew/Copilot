---
id: css-sass-less
title: Sass 和 Less 有什么区别？
aliases: [scss less区别, 预处理器, sass]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [Sass, SCSS, Less, 预处理器]
---

# Sass 和 Less 有什么区别？

## 核心回答

两个都是 CSS 预处理器，嵌套、变量、mixin、运算、拆分模块这些基础能力都有，最表面的差别是变量符号，Less 用 @，SCSS 用 $。核心差别在编程能力：Sass 全得多，有 @if/@else 条件、@for/@each 循环、@function 自定义函数，还有 map、list 这种数据结构，能封装比较复杂的样式逻辑；Less 简单够用，但复杂逻辑写起来很别扭。

我项目里用的 SCSS，Vite 装个 sass 就能跑，实际用得最多的是嵌套、变量和 mixin，老实说大部分项目用到这一层就够了。

## 展开回答

背景上是 Less 靠 Bootstrap 火过一阵，现在 dart-sass 是主流。另外原生 CSS 这几年追上来不少，有自定义属性和原生嵌套，预处理器的不可替代性主要剩 mixin、函数和 @use/@forward 的模块化能力。

## 面试官可能追问

- SCSS 变量和 CSS 自定义属性的区别？
- @use 和 @import 有什么区别？
- 为什么不直接写原生 CSS？
