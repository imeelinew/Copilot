---
id: yingke-movies-followup-029-vuex
title: 为什么没有使用 Vuex？
aliases: [能具体解释一下为什么没有使用 Vuex吗？, 从设计取舍看，为什么没有使用 Vuex？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [登录鉴权, 首页数据, 订单流程, 分页]
---

# 为什么没有使用 Vuex？

## 核心回答

当前数据主要属于单个页面：首页保存三个分类，列表保存自己的分页状态，详情保存一部影片信息；跨页面只传分类 ID 和影片 ID，没有复杂的用户、收藏或订单状态。在这种规模下引入 Vuex 会增加概念和维护成本，所以使用页面本地状态是合理的。如果以后加入登录信息、跨页面收藏、列表缓存或多页面共享筛选条件，再引入集中状态管理会更有价值。

## 回答要点

- 当前数据主要属于单个页面：首页保存三个分类，列表保存自己的分页状态，详情保存一部影片信息；
- 跨页面只传分类 ID 和影片 ID，没有复杂的用户、收藏或订单状态。
- 在这种规模下引入 Vuex 会增加概念和维护成本，所以使用页面本地状态是合理的。
- 如果以后加入登录信息、跨页面收藏、列表缓存或多页面共享筛选条件，再引入集中状态管理会更有价值。

## 面试官可能追问

- 关于“为什么没有使用 Vuex”，你为什么选择当前方案？
- “为什么没有使用 Vuex”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 22～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:22>)：首页分类数据保存在页面本地。
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表和分页状态保存在页面本地。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：依赖中没有 Vuex 或其他状态管理库。
