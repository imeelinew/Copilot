---
id: shiguangji-shop-normal-024-axios-fetch
title: 为什么商城请求用 Axios，AI 请求用 fetch？
aliases: [能具体解释一下为什么商城请求用 Axios，AI 请求用 fetch吗？, 从设计取舍看，为什么商城请求用 Axios，AI 请求用 fetch？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [Axios, Fetch, 地址管理, Token, 请求取消]
---

# 为什么商城请求用 Axios，AI 请求用 fetch？

## 核心回答

商城接口数量多，而且都需要统一基础地址、Token、数据解包和图片处理，所以使用 Axios 实例比较方便。AI 只有独立的同源调用，返回结构也是专门的 `{ text, error }`，所以单独使用 fetch 和 AbortController。这里是根据两类请求的职责拆开封装，并不是 AI 只能用 fetch；如果 AI 请求继续增加，也可以建立单独的 Axios 实例。

## 回答要点

- 商城接口数量多，而且都需要统一基础地址、Token、数据解包和图片处理，所以使用 Axios 实例比较方便。
- AI 只有独立的同源调用，返回结构也是专门的 { text, error }，所以单独使用 fetch 和 AbortController。
- 这里是根据两类请求的职责拆开封装，并不是 AI 只能用 fetch；
- 如果 AI 请求继续增加，也可以建立单独的 Axios 实例。

## 面试官可能追问

- 关于“为什么商城请求用 Axios，AI 请求用 fetch”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

[商城 Axios 第 17～55 行](/Users/aaron/personal-hub/apps/project-2/src/utils/request.ts:17)、[AI fetch 第 7～46 行](/Users/aaron/personal-hub/apps/project-2/src/ai/providers/openai.js:7)。
