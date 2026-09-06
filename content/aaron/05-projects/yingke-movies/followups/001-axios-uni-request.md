---
id: yingke-movies-followup-001-axios-uni-request
title: 【高频】uni-app 已经有 `uni.request`，为什么还要使用 Axios？
aliases: [能具体解释一下uni-app 已经有 `uni.request`，为什么还要使用 Axios吗？, 从设计取舍看，uni-app 已经有 `uni.request`，为什么还要使用 Axios？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Axios, uni.request, uni-app, 首页数据, 请求适配器]
---

# 【高频】uni-app 已经有 `uni.request`，为什么还要使用 Axios？

## 核心回答

这个项目引入 Axios，主要是想让首页、列表和详情都使用同一种 Promise 调用方式，同时把 `baseURL`、超时和响应解包放在一个地方管理。因为小程序真正发请求还是依赖 `uni.request`，所以代码里写了自定义 adapter，把 Axios 配置转换成 `uni.request` 参数。这样页面只调用 API 函数，不需要重复写底层请求逻辑。不过这个项目规模比较小，如果只做微信小程序，直接封装 `uni.request` 会更轻量，所以这里是统一调用方式和增加依赖之间的取舍，不是说 Axios 一定更好。

## 回答要点

- 这个项目引入 Axios，主要是想让首页、列表和详情都使用同一种 Promise 调用方式，同时把 baseURL、超时和响应解包放在一个地方管理。
- 因为小程序真正发请求还是依赖 uni.request，所以代码里写了自定义 adapter，把 Axios 配置转换成 uni.request 参数。
- 这样页面只调用 API 函数，不需要重复写底层请求逻辑。
- 不过这个项目规模比较小，如果只做微信小程序，直接封装 uni.request 会更轻量，所以这里是统一调用方式和增加依赖之间的取舍，不是说 Axios 一定更好。

## 面试官可能追问

- 关于“uni-app 已经有 `uni.request`，为什么还要使用 Axios”，你为什么选择当前方案？
- “uni-app 已经有 `uni.request`，为什么还要使用 Axios”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 3～33 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：自定义 adapter，并将它配置到 Axios 实例中。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：业务 API 使用统一实例发起请求。
