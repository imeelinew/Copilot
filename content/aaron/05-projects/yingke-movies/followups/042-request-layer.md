---
id: yingke-movies-followup-042-request-layer
title: 怎样验证请求封装？
aliases: [能具体解释一下怎样验证请求封装吗？, 从设计取舍看，怎样验证请求封装？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [请求封装, 验证方法, 分页, 自动化测试, 错误分层]
---

# 怎样验证请求封装？

## 核心回答

我会把验证分成正常和异常两组。正常场景检查请求方法、完整 URL、分页参数、请求头、超时和 `response.data` 解包是否正确；异常场景分别模拟网络断开、超时、HTTP 404/500、HTTP 200 但业务字段错误，以及返回结构缺失。重点不是只看 Network 有没有请求，而是确认错误进入了正确分支、页面没有继续读取错误数据。当前项目没有这些自动化测试，本次也没有实际执行，所以这里只能作为验证方案。

## 回答要点

- 我会把验证分成正常和异常两组。
- 正常场景检查请求方法、完整 URL、分页参数、请求头、超时和 response.data 解包是否正确；
- 异常场景分别模拟网络断开、超时、HTTP 404/500、HTTP 200 但业务字段错误，以及返回结构缺失。
- 重点不是只看 Network 有没有请求，而是确认错误进入了正确分支、页面没有继续读取错误数据。

## 面试官可能追问

- 关于“怎样验证请求封装”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：请求配置映射和网络回调是主要验证对象。
> - [utils/request.js 第 29～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：实例配置和拦截器是响应验证对象。
