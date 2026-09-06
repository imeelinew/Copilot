---
id: yingke-movies-normal-007-description-toggle
title: 简介展开和收起
aliases: [请介绍一下项目中的简介展开和收起。, 你在简介展开和收起方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [文本展开, 影视详情, 组件设计, Props]
---

# 简介展开和收起

## 核心回答

分类列表里的评论有长有短，如果全部直接展开，会让一条数据占用太多页面空间，所以我把这部分做成了 `descComment` 组件。组件接收完整评论，创建时判断文本长度；超过 50 个字符时先显示前 50 个字符，用户点击“展开”后显示全文，再点击“收起”就重新截断。列表项本身可以点击进入详情，因此简介区域还阻止了点击事件继续冒泡，避免用户只是展开文字却误跳到详情页。这样设计把文本状态和交互从列表页面中拆了出来，列表只需要传入评论内容。当前边界是短文本仍然会显示“展开”，而且组件只在创建时处理一次 props，后续 `val` 变化时不会重新计算。

## 回答要点

- 分类列表里的评论有长有短，如果全部直接展开，会让一条数据占用太多页面空间，所以我把这部分做成了 descComment 组件。
- 组件接收完整评论，创建时判断文本长度；
- 超过 50 个字符时先显示前 50 个字符，用户点击“展开”后显示全文，再点击“收起”就重新截断。
- 列表项本身可以点击进入详情，因此简介区域还阻止了点击事件继续冒泡，避免用户只是展开文字却误跳到详情页。

## 面试官可能追问

- 关于“简介展开和收起”，你为什么选择当前方案？
- “简介展开和收起”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 20～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:20>)：在列表中接入简介组件并阻止点击冒泡。
> - [components/descComment.vue 第 1～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:1>)：展开和收起的显示入口。
> - [components/descComment.vue 第 9～40 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:9>)：props、50 字截断、展开、收起及创建时初始化。
