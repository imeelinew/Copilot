---
id: yingke-movies-followup-003-axios-adapter
title: 【高频】这个自定义 adapter 是完整实现吗？
aliases: [能具体解释一下这个自定义 adapter 是完整实现吗吗？, 从设计取舍看，这个自定义 adapter 是完整实现吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [请求适配器, Axios, 分页]
---

# 【高频】这个自定义 adapter 是完整实现吗？

## 核心回答

不是完整的通用实现，它主要覆盖了这个项目当前用到的基础 GET 请求。代码已经映射了请求方法、URL、请求体、请求头和超时，也处理了网络成功和失败回调；但它没有把 Axios 的 `params` 转成查询字符串，也没有处理请求取消、上传下载进度、`responseType` 和完整的 HTTP 状态判断。当前分页接口把 `start` 和 `count` 直接拼进 URL，所以暂时没有暴露 `params` 未处理的问题。面试时我会把它说成项目级基础适配，不会说成完整请求框架。

## 回答要点

- 不是完整的通用实现，它主要覆盖了这个项目当前用到的基础 GET 请求。
- 代码已经映射了请求方法、URL、请求体、请求头和超时，也处理了网络成功和失败回调；
- 但它没有把 Axios 的 params 转成查询字符串，也没有处理请求取消、上传下载进度、responseType 和完整的 HTTP 状态判断。
- 当前分页接口把 start 和 count 直接拼进 URL，所以暂时没有暴露 params 未处理的问题。

## 面试官可能追问

- 关于“这个自定义 adapter 是完整实现吗”，你为什么选择当前方案？
- “这个自定义 adapter 是完整实现吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：当前 adapter 实际映射的字段和回调。
> - [api/list.js 第 3～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:3>)：分页参数直接拼接在 URL 中。
