---
id: yingke-movies-normal-038-mobile-layout
title: 移动端布局
aliases: [请介绍一下项目中的移动端布局。, 你在移动端布局方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [移动端适配, 自动化测试, uni-app]
---

# 移动端布局

## 核心回答

我会在不同尺寸的小程序模拟器和真机上检查横向卡片是否能完整滚动、列表的封面和内容区是否挤压、长标题是否正确省略、详情大图是否溢出，以及横竖屏或安全区域变化时是否出现遮挡。还要检查 `rpx` 和少量 `px` 混用后的实际比例。代码中存在响应式单位和固定视口尺寸，但没有视觉回归测试，也没有证据证明所有设备已经适配。

## 回答要点

- 我会在不同尺寸的小程序模拟器和真机上检查横向卡片是否能完整滚动、列表的封面和内容区是否挤压、长标题是否正确省略、详情大图是否溢出，以及横竖屏或安全区域变化时是否出现遮挡。
- 还要检查 rpx 和少量 px 混用后的实际比例。
- 代码中存在响应式单位和固定视口尺寸，但没有视觉回归测试，也没有证据证明所有设备已经适配。

## 面试官可能追问

- 关于“移动端布局”，你为什么选择当前方案？
- “移动端布局”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/listContent.vue 第 67～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:67>)：横向滚动、卡片固定 `rpx` 尺寸和标题省略。
> - [pages/list/index.vue 第 106～177 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:106>)：列表的 `rpx` 布局及像素边框。
> - [pages/detail/index.vue 第 41～56 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:41>)：详情页使用 `vw`、`vh` 和 `rpx` 的布局。
