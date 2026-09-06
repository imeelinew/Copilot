---
id: yingke-movies-normal-017-http-business-status
title: HTTP 200 是否代表接口业务一定成功？
aliases: [能具体解释一下HTTP 200 是否代表接口业务一定成功吗？, 从设计取舍看，HTTP 200 是否代表接口业务一定成功？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [错误分层, uni.request, 请求适配器]
---

# HTTP 200 是否代表接口业务一定成功？

## 核心回答

不代表。HTTP 200 只说明 HTTP 层返回成功，业务数据里仍然可能有错误码、空数据或字段缺失。当前响应拦截器只返回 `response.data`，没有判断业务状态码；自定义 adapter 对 `uni.request` 的 success 回调也直接 resolve，所以正式实现还需要分别处理网络错误、HTTP 错误和业务错误。

## 回答要点

- HTTP 200 只说明 HTTP 层返回成功，业务数据里仍然可能有错误码、空数据或字段缺失。
- 当前响应拦截器只返回 response.data，没有判断业务状态码；
- 自定义 adapter 对 uni.request 的 success 回调也直接 resolve，所以正式实现还需要分别处理网络错误、HTTP 错误和业务错误。

## 面试官可能追问

- 关于“HTTP 200 是否代表接口业务一定成功”，你为什么选择当前方案？
- “HTTP 200 是否代表接口业务一定成功”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：success 回调直接 resolve，fail 回调才 reject。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应拦截器只解包数据并继续抛出已有异常。
