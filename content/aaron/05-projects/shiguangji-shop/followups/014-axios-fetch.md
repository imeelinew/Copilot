---
id: shiguangji-shop-followup-014-axios-fetch
title: 商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？
aliases: [能具体解释一下商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别吗？, 从设计取舍看，商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [Axios, Fetch, 地址管理, Token, 请求取消]
---

# 商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别？

## 核心回答

商城接口数量多，而且都需要统一基础地址、Token 注入、响应解包和图片地址处理，所以使用 Axios 实例。AI 是一条独立的同源请求，返回结构是专门的 `{ text, error }`，因此直接用 fetch 和 AbortController 处理。这里是按两类请求的职责拆开，并不是 AI 必须使用 fetch；AI 接口变多以后，也可以建立单独的 Axios 实例。

fetch 遇到 404 或 500 不会只因为状态码就 reject，所以代码要主动检查 `resp.ok`，而且 `resp.json()` 读取响应体也是异步的。改进版把清理 15 秒计时器放在 finally 中，因此读取响应体期间也受控制；练习版收到 Response 后就清理计时器，后续读取卡住时不再受这个定时器保护。服务端对模型上游设置 12 秒，浏览器设置 15 秒，是给服务端留出返回超时错误的时间。两个数字都是当前配置，不能保证所有环境精确到点结束。

## 回答要点

- 商城接口数量多，而且都需要统一基础地址、Token 注入、响应解包和图片地址处理，所以使用 Axios 实例。
- AI 是一条独立的同源请求，返回结构是专门的 { text, error }，因此直接用 fetch 和 AbortController 处理。
- 这里是按两类请求的职责拆开，并不是 AI 必须使用 fetch；
- AI 接口变多以后，也可以建立单独的 Axios 实例。

## 面试官可能追问

- 关于“商城使用 Axios，为什么 AI 使用 fetch？12 秒和 15 秒超时有什么区别”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

> - [商城 Axios 第 17～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:17)：商城公共配置、Token 和响应处理。
> - [改进版 AI 客户端第 7～46 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)：状态码检查、响应读取和 finally 清理计时器。
> - [AI 服务端第 188～192 行](/Users/aaron/personal-hub/apps/project-2/api/ai.ts:188)：12 秒上游超时。
> - [练习版 AI 客户端第 44～80 行](/Users/aaron/CodingPractice/20_Vue3/mobile-shop/src/ai/providers/openai.js:44)：收到响应后提前清理计时器。
> - 原理参考：[MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)。
