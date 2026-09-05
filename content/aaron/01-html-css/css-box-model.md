---
id: css-box-model
title: 盒模型是什么？
aliases: [标准盒模型, ie盒模型, box-sizing, 怪异盒模型]
category: html-css
difficulty: 必问
priority: high
projects: []
keywords: [content, padding, border, box-sizing]
---

# 盒模型是什么？

## 核心回答

页面上每个元素都是一个盒子，从里到外是 content、padding、border、margin 四层。盒子的宽高怎么算有两种规则：标准盒模型，width 只包含 content；IE 盒模型，width 是 content、padding、border 三者加在一起。用 box-sizing 切换，默认是 content-box，设成 border-box 就是 IE 那种算法。

我的习惯是新项目全局设 box-sizing: border-box，因为说 200px 宽就是 200px，后面加 padding 不会把布局撑破，写栅格和组件时预期和结果是一致的。

## 展开回答

排查样式时有个经典现象：设了 width 又加 padding，元素变宽了，那就是默认 content-box 在起作用。另外 margin 不算在 width 里，它负责盒子之间的距离，而且垂直方向相邻的 margin 会合并，这个坑归到 BFC 那个话题里说。

## 面试官可能追问

- box-sizing 两个值的区别？
- 全局设置 border-box 一般怎么写？
- 相邻 margin 合并怎么解决？
