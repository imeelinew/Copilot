---
id: yingke-movies-normal-032-movie-detail
title: 详情页缺少加载期空值和异常保护
aliases: [请介绍一下项目中的详情页缺少加载期空值和异常保护。, 你在详情页缺少加载期空值和异常保护方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [影视详情, 加载状态, uni-app]
---

# 详情页缺少加载期空值和异常保护

## 核心回答

详情数据还没有返回时，`movieDetail` 是空对象，但模板直接读取 `movieDetail.pic.large`。在慢网、空响应或请求失败时，`pic` 可能不存在，页面就可能出现渲染错误或空白，而且用户也看不到明确反馈。可以给详情内容增加 `v-if`，或者初始化完整的数据结构，并补上 loading、empty、error 和重试状态。面试时我会说详情查询和字段展示已经接通，但不会说慢网和异常状态已经处理完整。

## 回答要点

- 详情数据还没有返回时，movieDetail 是空对象，但模板直接读取 movieDetail.pic.large。
- 在慢网、空响应或请求失败时，pic 可能不存在，页面就可能出现渲染错误或空白，而且用户也看不到明确反馈。
- 可以给详情内容增加 v-if，或者初始化完整的数据结构，并补上 loading、empty、error 和重试状态。
- 面试时我会说详情查询和字段展示已经接通，但不会说慢网和异常状态已经处理完整。

## 面试官可能追问

- 关于“详情页缺少加载期空值和异常保护”，你为什么选择当前方案？
- “详情页缺少加载期空值和异常保护”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：模板直接读取嵌套的 `movieDetail.pic.large`。
> - [pages/detail/index.vue 第 18～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：初始值为空对象，请求过程没有 loading、catch 或错误状态。
