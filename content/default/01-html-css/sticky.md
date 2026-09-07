---
id: css-sticky
title: position: sticky 什么时候会失效？
aliases: [sticky 不生效, 粘性定位, 吸顶]
category: html-css
difficulty: 进阶
priority: normal
projects: []
keywords: [sticky, overflow, top, 吸顶]
---

# position: sticky 什么时候会失效？

## 核心回答

sticky 是“在正常位置和固定位置之间切换”的定位方式。它必须指定一个阈值，比如 `top: 0`，并且滚动容器要有足够的空间。滚动时它会相对最近的滚动祖先吸住，不是永远相对窗口。

最常见的问题是祖先设置了不合适的 overflow，或者 sticky 元素所在容器高度不够；Flex 子项还可能因为默认的拉伸和高度约束看起来像没有吸顶。排查时我会先找真正滚动的容器，再确认 top、尺寸和层级。

## 追问：overflow: hidden 一定会让 sticky 失效吗？

不一定，但它会改变滚动容器和裁剪范围。如果 hidden 的祖先没有实际滚动空间，sticky 的参照就可能不是你以为的页面。需要结合页面结构看，不是看到 hidden 就直接下结论。

## 追问：sticky 和 fixed 怎么选？

需要脱离整个页面文档、始终贴着视口的用 fixed；只想在某个列表或内容区域滚动到阈值后吸顶的，用 sticky。sticky 保留原位置，通常更适合局部标题和表头。

## 追问：表格表头吸顶要注意什么？

确认表头所在的滚动容器、设置 top 和背景色，并处理 z-index，避免滚动内容从文字后面穿过去。复杂表格还要验证横向滚动和不同浏览器的表现。
