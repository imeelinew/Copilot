---
id: css-bfc
title: BFC 是什么？有什么用？
aliases: [块级格式化上下文, bfc触发条件, bfc应用, formatting context]
category: html-css
difficulty: 必问
priority: high
projects: []
keywords: [BFC, 清除浮动, margin合并, overflow]
---

# BFC 是什么？有什么用？

## 核心回答

BFC 是块级格式化上下文，页面上一块独立的渲染区域：内部盒子按自己的一套规则排，内部布局不影响外面，外面也影响不进来。触发条件记常用的：根元素；float 不为 none；position 是 absolute 或 fixed；overflow 不为 visible，日常最常用的就是 overflow: hidden；display 是 inline-block，另外 flex 和 grid 的子项也各自形成 BFC。

用途必说三个。一是清除浮动：父元素触发 BFC 后，算高度会把浮动的子元素算进去，高度不再塌陷。二是防止 margin 合并：相邻元素的上下 margin 会叠成一个，用 BFC 隔开就不合并了。三是自适应两栏布局：BFC 的区域不会和浮动元素重叠，右边栏设个 overflow: hidden，就能自动让开左边的浮动列。

## 展开回答

margin 合并有两种情况：相邻兄弟之间合并，父元素和第一个、最后一个子元素之间也会合并，BFC 能隔断后者，兄弟之间的合并把它们分别包一层也能解决。面试官经常从 BFC 追到清除浮动，这两块知识要能互相串起来讲。

## 面试官可能追问

- 触发 BFC 的方式有哪几种？
- margin 合并有哪几种情况，怎么解决？
- BFC 和清除浮动是什么关系？
