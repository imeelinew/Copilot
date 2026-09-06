---
id: yingke-movies-normal-033-description-toggle
title: 简介组件的状态推导不完整
aliases: [请介绍一下项目中的简介组件的状态推导不完整。, 你在简介组件的状态推导不完整方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [组件设计, 文本展开, Props]
---

# 简介组件的状态推导不完整

## 核心回答

当前组件无论文本是否超过 50 个字符，都会把 `isShow` 设为 true，所以短评论也会出现“展开”；另外它只在 `created` 时处理一次 `val`，如果父组件后来换了评论，展示文本不会重新计算。这会造成无意义按钮或旧内容残留。可以把“是否超长”和“当前是否展开”分开，用 computed 根据 `val` 和展开状态计算展示文本，或者监听 `val` 变化。面试时我会说长文本展开收起已经有主体实现，同时主动说明短文本和 props 更新仍有边界。

## 回答要点

- 当前组件无论文本是否超过 50 个字符，都会把 isShow 设为 true，所以短评论也会出现“展开”；
- 另外它只在 created 时处理一次 val，如果父组件后来换了评论，展示文本不会重新计算。
- 这会造成无意义按钮或旧内容残留。
- 可以把“是否超长”和“当前是否展开”分开，用 computed 根据 val 和展开状态计算展示文本，或者监听 val 变化。

## 面试官可能追问

- 关于“简介组件的状态推导不完整”，你为什么选择当前方案？
- “简介组件的状态推导不完整”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/descComment.vue 第 11～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:11>)：props 和本地展示状态。
> - [components/descComment.vue 第 19～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:19>)：短文本分支仍统一把 `isShow` 设为 true。
> - [components/descComment.vue 第 27～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:27>)：展开、收起和仅创建时初始化的逻辑。
