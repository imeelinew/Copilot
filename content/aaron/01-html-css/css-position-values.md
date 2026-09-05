---
id: css-position-values
title: position 有哪些值？分别什么场景用？
aliases: [定位, sticky, fixed定位, absolute定位]
category: html-css
difficulty: 基础
priority: high
projects: []
keywords: [position, absolute, fixed, sticky]
---

# position 有哪些值？分别什么场景用？

## 核心回答

常用的是五个值。static 是默认值，元素在正常文档流里，top、left 这些不生效。relative 相对定位，相对自己原来的位置偏移，原来的空间还占着，最常见的用途是给 absolute 的子元素当定位参照。absolute 绝对定位，脱离文档流，相对最近的非 static 祖先定位，找不到就一直往上到根。fixed 固定定位，相对视口，滚动也不动。sticky 粘性定位，没到阈值时和 relative 一样，滚过设定的 top 阈值就固定住，表头吸顶、侧边导航就是典型场景。

## 展开回答

两个实战细节：absolute 脱离文档流，不占父元素的布局空间，父元素高度会塌。sticky 有两个常见的不生效原因，一是没写 top 或 bottom 阈值，二是祖先元素设置了 overflow: hidden 这类滚动截断。另外 z-index 只对定位元素和 flex、grid 的子项生效，static 元素写了也白写。

## 面试官可能追问

- sticky 为什么经常不生效？
- absolute 是相对谁定位的？
- z-index 什么时候不起作用？
