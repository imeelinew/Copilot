---
id: yingke-movies-normal-005-movie-detail
title: 影视详情查询
aliases: [请介绍一下项目中的影视详情查询。, 你在影视详情查询方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [影视详情, 文本展开, onLoad]
---

# 影视详情查询

## 核心回答

用户在分类列表里点击一部影视后，可以进入详情页查看更完整的信息。列表项点击时会把影片 ID 带到详情页，详情页在 `onLoad` 中读取这个 ID，再调用详情接口，把 ID 拼进请求路径。返回结果保存到 `movieDetail` 后，页面展示大图封面、标题、副标题和剧情简介。这样设计的原因是路由只传一个稳定的资源 ID，不传整份影片对象，详情页可以按 ID 获取自己的数据，也让同一个详情页能够展示不同影片。它的上游是分类列表，下游没有更多业务页面。当前边界是 `movieDetail` 初始值为空对象，但模板直接读取 `movieDetail.pic.large`，缺少加载期间的空值保护，也没有单独的错误态和重试入口。

## 回答要点

- 用户在分类列表里点击一部影视后，可以进入详情页查看更完整的信息。
- 列表项点击时会把影片 ID 带到详情页，详情页在 onLoad 中读取这个 ID，再调用详情接口，把 ID 拼进请求路径。
- 返回结果保存到 movieDetail 后，页面展示大图封面、标题、副标题和剧情简介。
- 这样设计的原因是路由只传一个稳定的资源 ID，不传整份影片对象，详情页可以按 ID 获取自己的数据，也让同一个详情页能够展示不同影片。

## 面试官可能追问

- 关于“影视详情查询”，你为什么选择当前方案？
- “影视详情查询”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 75～79 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：携带影片 ID 跳转详情页。
> - [pages/detail/index.vue 第 18～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：保存 ID、请求详情并更新 `movieDetail`。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：把影片 ID 拼入详情请求路径。
> - [pages/detail/index.vue 第 1～10 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：展示封面、标题、副标题和简介。
