---
id: yingke-movies-followup-033-vant-weapp
title: 为什么全局注册 Vant 组件，不在每个页面单独注册？
aliases: [能具体解释一下为什么全局注册 Vant 组件，不在每个页面单独注册吗？, 从设计取舍看，为什么全局注册 Vant 组件，不在每个页面单独注册？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [组件设计, Vant Weapp, 首页数据]
---

# 为什么全局注册 Vant 组件，不在每个页面单独注册？

## 核心回答

图标、评分和加载反馈在首页、列表等位置重复使用，全局注册可以减少每个页面重复声明，也让使用方式保持一致。这个项目实际只注册了五类常用组件，规模还比较小。不过全局注册意味着所有页面都能看到这些依赖，如果后续组件很多、需要分包或对包体比较敏感，就应该按页面注册实际使用的组件，避免不必要的全局依赖。

## 回答要点

- 图标、评分和加载反馈在首页、列表等位置重复使用，全局注册可以减少每个页面重复声明，也让使用方式保持一致。
- 这个项目实际只注册了五类常用组件，规模还比较小。
- 不过全局注册意味着所有页面都能看到这些依赖，如果后续组件很多、需要分包或对包体比较敏感，就应该按页面注册实际使用的组件，避免不必要的全局依赖。

## 面试官可能追问

- 关于“为什么全局注册 Vant 组件，不在每个页面单独注册”，你为什么选择当前方案？
- “为什么全局注册 Vant 组件，不在每个页面单独注册”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages.json 第 27～34 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:27>)：全局注册 Icon、Rate、Loading、Skeleton 和 Toast。
> - [pages/home/index.vue 第 3～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页使用 Loading，并通过子组件使用图标和评分。
> - [pages/list/index.vue 第 3～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:3>)：列表使用 Skeleton、Toast、Rate 和 Icon。
