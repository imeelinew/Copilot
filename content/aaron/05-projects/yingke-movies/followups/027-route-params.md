---
id: yingke-movies-followup-027-route-params
title: 追问：为什么通过 URL 参数传分类 ID 和影片 ID？
aliases: [能具体解释一下为什么通过 URL 参数传分类 ID 和影片 ID吗？, 从设计取舍看，为什么通过 URL 参数传分类 ID 和影片 ID？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页数据, 影视详情, 页面导航]
---

# 追问：为什么通过 URL 参数传分类 ID 和影片 ID？

## 核心回答

分类 ID 和影片 ID 都是体积很小、可以序列化并且能唯一定位资源的数据，用路由参数传递比较直接。首页只传分类 ID，列表页再决定请求哪一类数据；列表只传影片 ID，详情页再获取最新详情。这样不需要把整份对象塞进路由，也能让同一套列表页和详情页服务不同数据。当前不足是目标页没有校验参数是否缺失或非法，正式实现应该在请求前增加校验和异常提示。

## 回答要点

- 分类 ID 和影片 ID 都是体积很小、可以序列化并且能唯一定位资源的数据，用路由参数传递比较直接。
- 首页只传分类 ID，列表页再决定请求哪一类数据；
- 列表只传影片 ID，详情页再获取最新详情。
- 这样不需要把整份对象塞进路由，也能让同一套列表页和详情页服务不同数据。

## 面试官可能追问

- 关于“为什么通过 URL 参数传分类 ID 和影片 ID”，你为什么选择当前方案？
- “为什么通过 URL 参数传分类 ID 和影片 ID”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/listContent.vue 第 32～35 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:32>)：首页把分类 ID 写入列表页 URL。
> - [pages/list/index.vue 第 75～83 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：列表把影片 ID 写入详情 URL，并接收分类参数。
> - [pages/detail/index.vue 第 34～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:34>)：详情页读取影片 ID 后请求数据。
