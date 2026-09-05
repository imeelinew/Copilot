---
id: css-responsive-mobile
title: 移动端适配是怎么做的？
aliases: [移动端适配方案, rem vw, 响应式布局, 移动端h5适配]
category: html-css
difficulty: 高频
priority: high
projects: [轻购]
keywords: [viewport, rem, vw, Vant, 1px, 安全区]
---

# 移动端适配是怎么做的？

## 核心回答

轻购是纯移动端 H5，我的做法是：先把 viewport 的 meta 标签设置对，宽度等于设备宽度、初始缩放 1，这个不对后面全歪。布局交给 flex 和 Vant 组件，商品列表、底部操作栏这些用弹性布局天然不破版。尺寸用相对单位，rem 和 vw 两条路线都行，我自己偏向 vw，不依赖 JS 算根字号，再配 max-width 挡住大屏，别让元素无限放大。

## 展开回答

有几个真实会碰到的坑。一个是高分屏的 1px 边框：CSS 的 1px 在 Retina 屏上是两三个物理像素，看着粗，常见解法是伪元素加 transform 缩。一个是 iPhone 底部安全区，要垫 env(safe-area-inset-bottom)，不然底部操作栏被小黑条压住。图片要给固定宽高比占位，不然加载的时候页面会跳。

测试不能只信开发者工具的模拟器，我会把常见机型过一遍，再拿真机滑一滑，触控目标不能太小，不然难点中。后台项目是另一套：Ant Design 的栅格加 ResizeObserver 处理图表容器就够了，不用做得这么细。

## 面试官可能追问

- rem 和 vw 怎么选？各有什么坑？
- 1px 边框问题的原理？
- 一套代码同时兼容 PC 和移动端怎么做？
