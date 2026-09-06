---
id: yingke-movies-normal-002-request-layer
title: 请求层封装
aliases: [请介绍一下项目中的请求层封装。, 你在请求层封装方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [请求封装, 首页数据, 影视详情, 地址管理, Token, Axios]
---

# 请求层封装

## 核心回答

这个功能对用户来说不是一个单独的页面，但它负责给首页、列表页和详情页稳定地提供数据。前端没有在每个页面里重复写 `uni.request`，而是先创建了一个 Axios 实例，再写一个自定义 adapter，也就是“适配器”，把 Axios 里的请求方法、基础地址、接口路径、请求体、请求头和超时时间转换成 `uni.request` 能识别的参数。请求成功后，适配器把小程序返回的数据整理成 Axios 响应结构，响应拦截器再只返回 `response.data`，所以业务页面拿到后可以直接使用。这样设计的原因是把基础地址、超时和返回格式放在一个位置管理，API 文件和页面都能使用一致的 Promise 调用方式。它和三个 API 模块直接衔接，首页、列表和详情都通过同一个实例请求数据。不过当前请求拦截器只是透传，没有 Token 或公共参数；适配器也没有完整处理 `params`、请求取消和 HTTP 异常状态，所以它是满足当前项目的基础封装，不是一个完整的通用请求库。

## 回答要点

- 这个功能对用户来说不是一个单独的页面，但它负责给首页、列表页和详情页稳定地提供数据。
- 前端没有在每个页面里重复写 uni.request，而是先创建了一个 Axios 实例，再写一个自定义 adapter，也就是“适配器”，把 Axios 里的请求方法、基础地址、接口路径、请求体、请求头和超时时间转…
- 请求成功后，适配器把小程序返回的数据整理成 Axios 响应结构，响应拦截器再只返回 response.data，所以业务页面拿到后可以直接使用。
- 这样设计的原因是把基础地址、超时和返回格式放在一个位置管理，API 文件和页面都能使用一致的 Promise 调用方式。

## 面试官可能追问

- 关于“请求层封装”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 3～27 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:3>)：把 Axios 配置转换为 `uni.request`，并整理成功、失败结果。
> - [utils/request.js 第 29～59 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:29>)：配置基础地址、5 秒超时以及请求、响应拦截器。
> - [api/user.js 第 1～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/user.js:1>)：首页三个分类通过统一实例请求。
> - [api/list.js 第 1～26 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/list.js:1>)：列表页三个分页接口通过统一实例请求。
> - [api/detail.js 第 1～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/api/detail.js:1>)：详情接口通过统一实例请求。
