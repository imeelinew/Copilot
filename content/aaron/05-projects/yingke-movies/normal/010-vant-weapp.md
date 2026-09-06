---
id: yingke-movies-normal-010-vant-weapp
title: Vant Weapp 组件接入
aliases: [请介绍一下项目中的Vant Weapp 组件接入。, 你在Vant Weapp 组件接入方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [组件设计, Vant Weapp, 首页数据, 页面导航, 服务端计价, 骨架屏]
---

# Vant Weapp 组件接入

## 核心回答

项目把图标、评分、Loading、Skeleton 和 Toast 注册成全局小程序组件，首页和列表页可以直接使用，避免在每个页面重复写组件注册。业务代码主要用 Vant 展示星级、方向图标和加载反馈，具体的影视数据组织、跳转和分页仍由项目页面负责。这里的设计价值是统一常见控件的外观和交互，不是重新开发了一套 UI 组件库；Vant 的内部能力属于第三方代码，面试时只能说明如何接入和使用。

## 回答要点

- 项目把图标、评分、Loading、Skeleton 和 Toast 注册成全局小程序组件，首页和列表页可以直接使用，避免在每个页面重复写组件注册。
- 业务代码主要用 Vant 展示星级、方向图标和加载反馈，具体的影视数据组织、跳转和分页仍由项目页面负责。
- 这里的设计价值是统一常见控件的外观和交互，不是重新开发了一套 UI 组件库；
- Vant 的内部能力属于第三方代码，面试时只能说明如何接入和使用。

## 面试官可能追问

- 关于“Vant Weapp 组件接入”，你为什么选择当前方案？
- “Vant Weapp 组件接入”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：全局注册五类 Vant Weapp 组件。
> - [components/listContent.vue 第 5～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:5>)：首页卡片使用图标和评分组件。
> - [pages/list/index.vue 第 3～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表页使用骨架屏、Toast、评分和图标组件。
