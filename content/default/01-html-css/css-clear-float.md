---
id: css-clear-float
title: 清除浮动有哪些方式？
aliases: [清除浮动, clear both, 浮动塌陷, 高度塌陷]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [float, clear, 伪元素, BFC]
---

# 清除浮动有哪些方式？

## 核心回答

浮动元素脱离文档流，父元素计算高度时不算它，父元素就塌了，后面的内容还会绕到浮动元素旁边去。所以清除浮动就两个思路：要么让父元素把浮动子元素算进高度，也就是触发 BFC；要么在浮动后面放个元素把文档流接回来，也就是 clear。

具体做法：最省事的是父元素直接加 overflow: hidden 或 auto，副作用是会裁掉故意溢出的内容，比如下拉菜单。主流做法是伪元素，在父元素的 ::after 上写 content: ""、display: block、clear: both，不污染结构没副作用。末尾加一个空 div 写 clear: both 也能解决，但结构里多了无意义的标签，不太推荐。

## 展开回答

clear: both 的原理是给元素规定左右两侧不允许出现浮动元素，浏览器会把它排到浮动元素下方。另外说一句，现在的布局大多直接用 flex 或 grid，基本不产生浮动问题，浮动主要剩文字环绕这种场景，但维护老代码和面试这块绕不开。

## 面试官可能追问

- clear: both 是什么原理？
- overflow: hidden 清浮动有什么副作用？
- 为什么浮动会让父元素高度塌陷？
