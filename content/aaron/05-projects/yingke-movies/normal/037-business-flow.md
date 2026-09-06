---
id: yingke-movies-normal-037-business-flow
title: 普通业务流程
aliases: [请介绍一下项目中的普通业务流程。, 你在普通业务流程方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [项目概览, 首页数据, 文本展开, 验证方法, 自动化测试]
---

# 普通业务流程

## 核心回答

我会从首页开始，分别核对三个分类的标题、数量、封面、评分和首屏 8 条数据，再点击每个分类的“更多”，确认分类 ID 与目标列表一致；列表连续加载多页后，再点击影片进入详情，核对影片 ID、封面、标题、副标题和简介是否对应。简介需要分别使用少于、等于和大于 50 个字符的文本，检查展开、收起以及点击时是否误跳详情。当前代码没有自动化业务测试，本次也没有实际运行这些步骤，所以这些是建议验证方法，不是已通过结果。

## 回答要点

- 我会从首页开始，分别核对三个分类的标题、数量、封面、评分和首屏 8 条数据，再点击每个分类的“更多”，确认分类 ID 与目标列表一致；
- 列表连续加载多页后，再点击影片进入详情，核对影片 ID、封面、标题、副标题和简介是否对应。
- 简介需要分别使用少于、等于和大于 50 个字符的文本，检查展开、收起以及点击时是否误跳详情。
- 当前代码没有自动化业务测试，本次也没有实际运行这些步骤，所以这些是建议验证方法，不是已通过结果。

## 面试官可能追问

- 关于“普通业务流程”，你为什么选择当前方案？
- “普通业务流程”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 3～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:3>)：首页三个分类入口。
> - [pages/list/index.vue 第 5～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:5>)：列表条目、评分、详情点击和简介入口。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：详情需要核对的展示字段。
