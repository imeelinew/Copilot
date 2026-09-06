---
id: yingke-movies-normal-003-homepage-data-aggregation
title: 首页分类聚合
aliases: [请介绍一下项目中的首页分类聚合。, 你在首页分类聚合方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, Promise.allSettled, Promise.all, onLoad]
---

# 首页分类聚合

## 核心回答

用户打开首页后，可以在同一页看到国产剧、综艺和美剧三个分类，不需要逐个进入页面查看。首页在 `onLoad` 中触发加载，然后分别调用三个分类接口，每个分类先取 8 条数据，再用 `Promise.allSettled` 同时等待三个请求结束。请求结果分别保存到三个页面状态中，再交给同一个分类卡片组件展示。选择并发请求，是因为三个分类互不依赖，如果串行请求会让总等待时间变成三次请求时间相加；使用 `allSettled` 还能保留每个请求各自的执行结果。这个功能向下衔接公共卡片组件，点击“更多”后再进入对应分类列表。它的边界是当前代码虽然使用了 `allSettled`，但没有判断结果是 fulfilled 还是 rejected，组件又直接读取 `value`，所以其中一个请求失败时并没有真正完成单分类降级。

## 回答要点

- 用户打开首页后，可以在同一页看到国产剧、综艺和美剧三个分类，不需要逐个进入页面查看。
- 首页在 onLoad 中触发加载，然后分别调用三个分类接口，每个分类先取 8 条数据，再用 Promise.allSettled 同时等待三个请求结束。
- 请求结果分别保存到三个页面状态中，再交给同一个分类卡片组件展示。
- 选择并发请求，是因为三个分类互不依赖，如果串行请求会让总等待时间变成三次请求时间相加；

## 面试官可能追问

- 关于“首页分类聚合”，你为什么选择当前方案？
- “首页分类聚合”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 22～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：定义三个分类状态，并在 `onLoad` 中触发加载。
> - [pages/home/index.vue 第 36～67 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：并发执行三个分类请求并保存 settlement 结果。
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：三个首页接口分别固定请求 8 条数据。
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：加载态及三个分类组件的渲染入口。
