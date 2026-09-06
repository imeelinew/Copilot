---
id: yingke-movies-followup-004-interceptors
title: 【高频】请求拦截器和响应拦截器分别做了什么？
aliases: [能具体解释一下请求拦截器和响应拦截器分别做了什么吗？, 从设计取舍看，请求拦截器和响应拦截器分别做了什么？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: high
projects: [映刻影视]
keywords: [Token, uni-app, 影视小程序]
---

# 【高频】请求拦截器和响应拦截器分别做了什么？

## 核心回答

当前请求拦截器只是把配置原样返回，相当于留了一个扩展位置，并没有加入 Token 或公共参数。响应拦截器会把完整响应解包成 `response.data`，让页面直接拿业务数据；已经进入异常分支的错误则继续向上抛。它解决的是调用格式统一，但还没有做 Token 刷新、自动重试、业务错误码判断和全局错误提示，所以这些能力不能算在现有项目里。

## 回答要点

- 当前请求拦截器只是把配置原样返回，相当于留了一个扩展位置，并没有加入 Token 或公共参数。
- 响应拦截器会把完整响应解包成 response.data，让页面直接拿业务数据；
- 已经进入异常分支的错误则继续向上抛。
- 它解决的是调用格式统一，但还没有做 Token 刷新、自动重试、业务错误码判断和全局错误提示，所以这些能力不能算在现有项目里。

## 面试官可能追问

- 关于“请求拦截器和响应拦截器分别做了什么”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 35～45 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:35>)：请求拦截器只透传配置和错误。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：响应拦截器解包 `response.data` 并继续抛出错误。
