---
id: yingke-movies-normal-029-http-business-status
title: 请求成功与业务成功没有分层判断
aliases: [请介绍一下项目中的请求成功与业务成功没有分层判断。, 你在请求成功与业务成功没有分层判断方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [uni.request, 请求适配器, 错误分层]
---

# 请求成功与业务成功没有分层判断

## 核心回答

当前 adapter 只要进入 `uni.request` 的 success 回调就会 resolve，响应拦截器也只做 `response.data` 解包。如果服务端返回 404、500，或者 HTTP 200 但业务数据包含错误码，页面可能继续把它当正常数据使用，最终出现字段为空或渲染异常。可以在 adapter 中按 HTTP 状态决定成功或失败，再在响应拦截器中根据明确的业务协议判断业务状态，并把网络、HTTP 和业务错误转换成统一错误对象。面试时我会说“项目已经统一了请求入口和基础响应解包，但错误分层还没有完善”，不会说已经完成全局异常处理。

## 回答要点

- 当前 adapter 只要进入 uni.request 的 success 回调就会 resolve，响应拦截器也只做 response.data 解包。
- 如果服务端返回 404、500，或者 HTTP 200 但业务数据包含错误码，页面可能继续把它当正常数据使用，最终出现字段为空或渲染异常。
- 可以在 adapter 中按 HTTP 状态决定成功或失败，再在响应拦截器中根据明确的业务协议判断业务状态，并把网络、HTTP 和业务错误转换成统一错误对象。
- 面试时我会说“项目已经统一了请求入口和基础响应解包，但错误分层还没有完善”，不会说已经完成全局异常处理。

## 面试官可能追问

- 关于“请求成功与业务成功没有分层判断”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：success 回调没有根据 `statusCode` 决定 reject。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应层没有业务状态码判断。
