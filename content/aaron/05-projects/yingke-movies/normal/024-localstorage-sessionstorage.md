---
id: yingke-movies-normal-024-localstorage-sessionstorage
title: 为什么数据不存 LocalStorage 或 sessionStorage？
aliases: [能具体解释一下为什么数据不存 LocalStorage 或 sessionStorage吗？, 从设计取舍看，为什么数据不存 LocalStorage 或 sessionStorage？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [localStorage, sessionStorage, AI Key, Token, 第三方 API]
---

# 为什么数据不存 LocalStorage 或 sessionStorage？

## 核心回答

当前展示的是第三方接口返回的影视数据，页面进入时按分类或影片 ID 请求，代码没有使用 LocalStorage、sessionStorage 或小程序 Storage。这个规模下直接维护页面状态更简单，也能避免长期缓存带来的过期数据。如果以后要做列表缓存，可以使用小程序 Storage，并配合缓存版本和过期时间；但 Token、第三方密钥等敏感信息不能因为方便就当作普通业务缓存处理。

## 回答要点

- 当前展示的是第三方接口返回的影视数据，页面进入时按分类或影片 ID 请求，代码没有使用 LocalStorage、sessionStorage 或小程序 Storage。
- 这个规模下直接维护页面状态更简单，也能避免长期缓存带来的过期数据。
- 如果以后要做列表缓存，可以使用小程序 Storage，并配合缓存版本和过期时间；
- 但 Token、第三方密钥等敏感信息不能因为方便就当作普通业务缓存处理。

## 面试官可能追问

- 关于“为什么数据不存 LocalStorage 或 sessionStorage”，你为什么选择当前方案？
- “为什么数据不存 LocalStorage 或 sessionStorage”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 22～30 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：首页数据只保存在页面状态并在加载时请求。
> - [pages/list/index.vue 第 38～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表和分页状态只保存在页面实例中。
