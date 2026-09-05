---
id: css-hidden-ways
title: "visibility: hidden、opacity: 0、display: none 有什么区别？"
aliases: [visibility hidden, display none, opacity 0, 元素隐藏方式]
category: html-css
difficulty: 高频
priority: high
projects: []
keywords: [display, visibility, opacity, 重排重绘]
---

# visibility: hidden、opacity: 0、display: none 有什么区别？

## 核心回答

三个都能让元素看不见，但程度完全不同。display: none 是彻底从渲染树里拿掉，不占空间，会触发重排，元素和里面的子元素都收不到事件。visibility: hidden 布局还在，位置照样占着，只是不画出来，也不响应交互，只触发重绘；它的子元素可以单独设 visibility: visible 变回可见。opacity: 0 只是把透明度调成 0，布局和事件都在，照样能点到，而且透明度是作用于整个元素的，子元素没法单独调回来。

一句话总结：display: none 不占位不响应，visibility: hidden 占位不响应，opacity: 0 占位还响应。

## 展开回答

做动画时这个区别很关键：opacity 和 visibility 都能过渡，淡入淡出常用 opacity 加 visibility 组合；display 是离散值没法直接过渡，要配合 JS 控制切换时机。对读屏软件来说，display: none 和 visibility: hidden 的内容读不到，opacity: 0 的内容其实还留在文档里。

## 面试官可能追问

- 哪个还能收到点击事件？
- 想给 display: none 的元素做淡入动画怎么办？
- visibility: hidden 的子元素设成 visible 能看见吗？
