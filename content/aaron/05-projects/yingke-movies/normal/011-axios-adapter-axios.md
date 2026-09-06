---
id: yingke-movies-normal-011-axios-adapter-axios
title: 用自定义 adapter 连接 Axios 和小程序请求
aliases: [请介绍一下项目中的用自定义 adapter 连接 Axios 和小程序请求。, 你在用自定义 adapter 连接 Axios 和小程序请求方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Axios, 请求适配器, 地址管理, 验证方法, uni.request, 请求取消]
---

# 用自定义 adapter 连接 Axios 和小程序请求

## 核心回答

这个项目里比较有技术处理的一点，是让 Axios 的调用方式能够落到小程序的 `uni.request` 上。最直接的写法是在每个页面里直接调用 `uni.request`，但这样基础地址、超时、响应拆包和错误传递容易散落在多个页面；直接依赖浏览器环境中的默认网络实现，在小程序运行环境里也不合适。当前代码通过自定义 adapter，把 Axios 配置翻译成 `uni.request` 参数，再把返回结果整理成 Axios 能继续处理的结构，因此 API 模块和页面可以使用统一实例。它的限制是只覆盖了当前项目需要的基础字段，HTTP 非 2xx、`params` 序列化、取消请求等能力还不完整。验证时需要分别检查正常请求、网络失败、超时和 HTTP 4xx/5xx，确认请求参数、响应解包以及 Promise 成功或失败分支是否符合预期，不能只看是否返回 HTTP 200。

## 回答要点

- 这个项目里比较有技术处理的一点，是让 Axios 的调用方式能够落到小程序的 uni.request 上。
- 最直接的写法是在每个页面里直接调用 uni.request，但这样基础地址、超时、响应拆包和错误传递容易散落在多个页面；
- 直接依赖浏览器环境中的默认网络实现，在小程序运行环境里也不合适。
- 当前代码通过自定义 adapter，把 Axios 配置翻译成 uni.request 参数，再把返回结果整理成 Axios 能继续处理的结构，因此 API 模块和页面可以使用统一实例。

## 面试官可能追问

- 关于“用自定义 adapter 连接 Axios 和小程序请求”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：adapter 的请求参数映射和返回结构转换。
> - [utils/request.js 第 29～59 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：将 adapter 接入 Axios 实例，并统一解包响应数据。
> - [api/detail.js 第 3～8 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:3>)：业务 API 使用统一实例发起详情请求。
