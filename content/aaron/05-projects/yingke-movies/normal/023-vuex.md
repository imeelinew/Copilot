---
id: yingke-movies-normal-023-vuex
title: 为什么没有使用 Vuex？
aliases: [能具体解释一下为什么没有使用 Vuex吗？, 从设计取舍看，为什么没有使用 Vuex？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [登录鉴权, 订单流程, uni-app]
---

# 为什么没有使用 Vuex？

## 核心回答

当前状态主要属于单个页面，跨页面只传分类 ID 和影片 ID，没有复杂的用户信息、收藏或订单状态，因此引入 Vuex 会增加不必要的复杂度。如果后续加入跨页面收藏、列表缓存或登录状态，再考虑集中状态管理更合适。

## 回答要点

- 当前状态主要属于单个页面，跨页面只传分类 ID 和影片 ID，没有复杂的用户信息、收藏或订单状态，因此引入 Vuex 会增加不必要的复杂度。
- 如果后续加入跨页面收藏、列表缓存或登录状态，再考虑集中状态管理更合适。

## 面试官可能追问

- 关于“为什么没有使用 Vuex”，你为什么选择当前方案？
- “为什么没有使用 Vuex”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：列表状态保存在页面本地。
> - [pages/detail/index.vue 第 18～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:18>)：详情状态保存在页面本地。
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：依赖中没有 Vuex 或其他状态管理库。
