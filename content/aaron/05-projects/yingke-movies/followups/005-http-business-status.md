---
id: yingke-movies-followup-005-http-business-status
title: 追问：HTTP 404、500 会进入响应错误拦截器吗？
aliases: [能具体解释一下HTTP 404、500 会进入响应错误拦截器吗吗？, 从设计取舍看，HTTP 404、500 会进入响应错误拦截器吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [错误分层, 请求封装, uni.request, 请求适配器]
---

# 追问：HTTP 404、500 会进入响应错误拦截器吗？

## 核心回答

按当前 adapter 的写法，不能保证会进入错误拦截器。`uni.request` 的 success 回调表示网络请求过程完成，不等于 HTTP 状态一定是 2xx；但代码进入 success 后会直接 resolve，没有根据 `statusCode` 决定成功还是失败。所以 404、500 也可能沿成功链路继续传递。更完整的做法是在 adapter 中按 HTTP 状态进行判断，再把网络错误、HTTP 错误和业务错误分开处理。HTTP 200 也只代表协议层成功，不能直接等同于业务成功。

## 回答要点

- 按当前 adapter 的写法，不能保证会进入错误拦截器。
- uni.request 的 success 回调表示网络请求过程完成，不等于 HTTP 状态一定是 2xx；
- 但代码进入 success 后会直接 resolve，没有根据 statusCode 决定成功还是失败。
- 所以 404、500 也可能沿成功链路继续传递。

## 面试官可能追问

- 关于“HTTP 404、500 会进入响应错误拦截器吗”，你为什么选择当前方案？
- “HTTP 404、500 会进入响应错误拦截器吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：success 回调不检查 `statusCode` 就直接 resolve。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应拦截器没有业务状态判断。
