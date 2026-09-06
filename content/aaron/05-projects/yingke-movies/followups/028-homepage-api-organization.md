---
id: yingke-movies-followup-028-homepage-api-organization
title: 首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？
aliases: [能具体解释一下首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似吗？, 从设计取舍看，首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [首页数据, uni-app, 影视小程序]
---

# 首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似？

## 核心回答

当前是按使用页面拆文件：首页用 `user.js`，列表用 `list.js`，但 `user.js` 这个名字和影视业务不匹配，而且三个分类接口重复度很高。更清楚的设计是统一成类似 `getCollectionItems(collectionId, start, count)` 的函数，让首页和列表都复用，再用配置表维护分类 ID。只有两个页面的接口语义或数据处理确实不同时，才值得拆成两套。当前写法比较直观，但命名和复用还可以改进。

## 回答要点

- 当前是按使用页面拆文件：首页用 user.js，列表用 list.js，但 user.js 这个名字和影视业务不匹配，而且三个分类接口重复度很高。
- 更清楚的设计是统一成类似 getCollectionItems(collectionId, start, count) 的函数，让首页和列表都复用，再用配置表维护分类 ID。
- 只有两个页面的接口语义或数据处理确实不同时，才值得拆成两套。
- 当前写法比较直观，但命名和复用还可以改进。

## 面试官可能追问

- 关于“首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似”，你为什么选择当前方案？
- “首页 API 和列表 API 为什么分成 `user.js`、`list.js`，但代码又很相似”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [api/user.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:3>)：首页分别定义三个固定分类接口。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：列表再次定义结构相同的三个分页接口。
