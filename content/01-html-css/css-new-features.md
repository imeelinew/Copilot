---
id: css-new-features
title: CSS3 有哪些新特性？
aliases: [css3新特性, css新增属性, css3]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [选择器, 圆角, 动画, flex]
---

# CSS3 有哪些新特性？

## 核心回答

我按平时真在用的来说：选择器更强了，:nth-child、:not() 这些结构伪类能少写很多类名；视觉上多了圆角、阴影、渐变；transform 能做位移、旋转、缩放；transition 和 @keyframes 让状态过渡和复杂动画都能纯 CSS 实现；布局上是 flex 和 grid；还有媒体查询，响应式就靠它。

面试官问这个其实是想听你用过什么，所以我不背清单，挑两三个结合场景说，比如表单校验错误提示的抖动就是 keyframes 做的，卡片悬浮上浮是 transition 加 transform。

## 展开回答

再补几个现代 CSS 的东西能加分：自定义属性就是 CSS 变量，配 var() 用；calc() 可以混合单位做计算；filter 能做高斯模糊这类滤镜；object-fit 控制图片在容器里的裁切方式。

## 面试官可能追问

- CSS 变量和 SCSS 变量的区别？
- grid 和 flex 分别什么场景用？
- 媒体查询写过吗，按什么定断点？
