---
id: shiguangji-shop-normal-003-request-layer
title: 网络请求封装
aliases: [请介绍一下项目中的网络请求封装。, 你在网络请求封装方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 深入
priority: normal
projects: [拾光集移动商城系统]
keywords: [请求封装, 登录鉴权, 地址管理, HttpOnly Cookie, Token, Axios]
---

# 网络请求封装

## 核心回答

网络请求方面，我没有让每个页面直接写完整的接口地址和重复的请求配置，而是创建了一个 Axios 实例。这个实例统一设置基础地址、超时时间和 JSON 请求头；发送请求前，如果本地有登录 Token，就自动把它放进 Authorization；收到响应后，统一返回接口中的业务数据，并把旧图片域名转换成本站的图片代理地址。

在这个基础上，我又封装了 GET、POST、PUT 和 DELETE 方法。各个业务 API 文件只需要写接口路径和参数，页面只关心“我要请求什么数据”。这样做的原因是，接口地址、鉴权方式或者统一响应处理发生变化时，可以集中修改，不需要到每个页面里逐个查找。

部署版浏览器统一请求本站的 `/api`，再由服务端函数转发到商城上游。代理只转发必要的请求头，不会把浏览器 Cookie 和平台内部请求头全部带给上游。需要说明的是，目前响应拦截器主要处理 HTTP 层错误和数据解包，页面仍然需要判断接口里的 `success` 或业务状态码；它还没有做到全局处理业务失败、401 退出和 Token 刷新。

## 回答要点

- 网络请求方面，我没有让每个页面直接写完整的接口地址和重复的请求配置，而是创建了一个 Axios 实例。
- 这个实例统一设置基础地址、超时时间和 JSON 请求头；
- 发送请求前，如果本地有登录 Token，就自动把它放进 Authorization；
- 收到响应后，统一返回接口中的业务数据，并把旧图片域名转换成本站的图片代理地址。

## 面试官可能追问

- 关于“网络请求封装”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

> - [request.ts 第 17～25 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:17)：Axios 基础地址、超时和公共请求头。
> - [request.ts 第 27～42 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:27)：请求前自动读取并注入 Token。
> - [request.ts 第 44～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:44)：响应数据解包和旧图片地址改写。
> - [request.ts 第 58～77 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:58)：GET、POST、PUT、DELETE 二次封装。
> - [商城代理第 19～50 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:19)：固定上游、路径处理和请求头白名单。
> - [商城代理第 52～80 行](/Users/aaron/personal-hub/apps/project-2/api/proxy.ts:52)：请求转发、15 秒超时和错误返回。
