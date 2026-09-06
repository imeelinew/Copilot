---
id: yingke-movies-normal-009-loading-feedback
title: 页面等待反馈
aliases: [请介绍一下项目中的页面等待反馈。, 你在页面等待反馈方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页数据, 骨架屏, Vant Weapp, 加载状态]
---

# 页面等待反馈

## 核心回答

用户等待数据时，首页会显示居中的 Vant Loading，列表页会先显示 Vant Skeleton 骨架屏，触底时还会调用小程序 loading，到达总数后用 Toast 提示“已经到底了”。这些反馈的作用是让用户知道页面正在等待或已经没有更多数据，骨架屏只改变等待时的视觉呈现，并不会缩短接口请求时间。当前代码没有统一的错误页和空列表提示，而且触底 loading 的关闭时机早于异步请求完成，所以这里适合表述为“接入了基础等待反馈”，不能说已经形成完整的加载状态体系。

## 回答要点

- 用户等待数据时，首页会显示居中的 Vant Loading，列表页会先显示 Vant Skeleton 骨架屏，触底时还会调用小程序 loading，到达总数后用 Toast 提示“已经到底了”。
- 这些反馈的作用是让用户知道页面正在等待或已经没有更多数据，骨架屏只改变等待时的视觉呈现，并不会缩短接口请求时间。
- 当前代码没有统一的错误页和空列表提示，而且触底 loading 的关闭时机早于异步请求完成，所以这里适合表述为“接入了基础等待反馈”，不能说已经形成完整的加载状态体系。

## 面试官可能追问

- 关于“页面等待反馈”，你为什么选择当前方案？
- “页面等待反馈”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页 Loading 与内容区切换。
> - [pages/list/index.vue 第 3～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表页骨架屏、Toast 容器和内容结构。
> - [pages/list/index.vue 第 64～73 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：数据返回后关闭骨架屏。
> - [pages/list/index.vue 第 88～101 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：触底 loading 和到底提示。
