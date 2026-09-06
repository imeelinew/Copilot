---
id: yingke-movies-normal-008-homepage-navigation-flow
title: 首页到列表再到详情的导航链路
aliases: [请介绍一下项目中的首页到列表再到详情的导航链路。, 你在首页到列表再到详情的导航链路方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页数据, 页面导航, 影视详情]
---

# 首页到列表再到详情的导航链路

## 核心回答

除了单个页面功能，项目还用两级 ID 把完整浏览流程串了起来：首页点击“更多”时传分类 ID，列表页根据分类 ID 选择请求函数；列表点击影片时再传影片 ID，详情页根据影片 ID 请求具体信息。这样分类列表页和详情页都不需要为每个分类、每部影片单独创建页面，而是用同一套页面根据参数展示不同内容。当前路由参数没有做缺失值或非法值校验，因此它能证明导航链路已经接入，但不能说参数异常处理已经完善。

## 回答要点

- 除了单个页面功能，项目还用两级 ID 把完整浏览流程串了起来：首页点击“更多”时传分类 ID，列表页根据分类 ID 选择请求函数；
- 列表点击影片时再传影片 ID，详情页根据影片 ID 请求具体信息。
- 这样分类列表页和详情页都不需要为每个分类、每部影片单独创建页面，而是用同一套页面根据参数展示不同内容。
- 当前路由参数没有做缺失值或非法值校验，因此它能证明导航链路已经接入，但不能说参数异常处理已经完善。

## 面试官可能追问

- 关于“首页到列表再到详情的导航链路”，你为什么选择当前方案？
- “首页到列表再到详情的导航链路”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [components/listContent.vue 第 28～38 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:28>)：从首页向列表页传分类 ID。
> - [pages/list/index.vue 第 53～62 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:53>)：根据分类 ID 选择接口。
> - [pages/list/index.vue 第 75～83 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:75>)：向详情页传影片 ID，并接收列表页分类参数。
> - [pages/detail/index.vue 第 25～37 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:25>)：根据影片 ID 请求详情。
