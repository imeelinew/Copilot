---
id: yingke-movies-normal-015-axios-uni-request
title: 为什么不直接使用 `uni.request`，还要引入 Axios？
aliases: [能具体解释一下为什么不直接使用 `uni.request`，还要引入 Axios吗？, 从设计取舍看，为什么不直接使用 `uni.request`，还要引入 Axios？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [Axios, uni.request, 地址管理, 请求适配器]
---

# 为什么不直接使用 `uni.request`，还要引入 Axios？

## 核心回答

我希望 API 层保持统一的 Promise 调用方式，并集中管理基础地址、超时和响应解包，所以通过 adapter 让 Axios 最终调用 `uni.request`。这个项目规模不大，如果只考虑微信小程序，单独封装 `uni.request` 会更轻；这里是统一调用模型和增加依赖之间的取舍，不是 Axios 一定更好。

## 回答要点

- 我希望 API 层保持统一的 Promise 调用方式，并集中管理基础地址、超时和响应解包，所以通过 adapter 让 Axios 最终调用 uni.request。
- 这个项目规模不大，如果只考虑微信小程序，单独封装 uni.request 会更轻；
- 这里是统一调用模型和增加依赖之间的取舍，不是 Axios 一定更好。

## 面试官可能追问

- 关于“为什么不直接使用 `uni.request`，还要引入 Axios”，你为什么选择当前方案？
- “为什么不直接使用 `uni.request`，还要引入 Axios”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 3～33 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：自定义 adapter 和 Axios 实例配置。
