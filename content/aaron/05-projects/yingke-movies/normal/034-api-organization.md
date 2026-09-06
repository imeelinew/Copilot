---
id: yingke-movies-normal-034-api-organization
title: API 定义存在重复和命名不清楚
aliases: [请介绍一下项目中的API 定义存在重复和命名不清楚。, 你在API 定义存在重复和命名不清楚方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页数据, 地址管理, uni-app]
---

# API 定义存在重复和命名不清楚

## 核心回答

首页和列表页分别定义了国产剧、综艺和美剧三个函数，请求地址高度重复，而且首页接口文件叫 `user.js`，不能准确表达影视分类业务。分类继续增加时，重复代码会变多，也更容易只改到其中一处。可以统一成 `getCollectionItems(collectionId, start, count)`，再通过配置表维护分类 ID；文件名也改成与影视集合相关的名称。面试时我会说当前按页面拆分便于理解，但复用程度和命名还有改进空间，不会把重复 API 包装成分层设计亮点。

## 回答要点

- 首页和列表页分别定义了国产剧、综艺和美剧三个函数，请求地址高度重复，而且首页接口文件叫 user.js，不能准确表达影视分类业务。
- 分类继续增加时，重复代码会变多，也更容易只改到其中一处。
- 可以统一成 getCollectionItems(collectionId, start, count)，再通过配置表维护分类 ID；
- 文件名也改成与影视集合相关的名称。

## 面试官可能追问

- 关于“API 定义存在重复和命名不清楚”，你为什么选择当前方案？
- “API 定义存在重复和命名不清楚”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：首页重复定义三个固定分页接口。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：列表页再次定义结构相同的三个接口。
> - [pages/list/index.vue 第 54～61 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:54>)：使用条件分支选择分类函数。
