---
id: yunshu-smart-city-normal-026-websocket-eventsource-ai-streaming
title: AI 流式请求为什么用 Fetch，不用 Axios、EventSource 或 WebSocket？
aliases: [能具体解释一下AI 流式请求为什么用 Fetch，不用 Axios、EventSource 或 WebSocket吗？, 从设计取舍看，AI 流式请求为什么用 Fetch，不用 Axios、EventSource 或 WebSocket？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [WebSocket, Axios, Fetch, 流式解析]
---

# AI 流式请求为什么用 Fetch，不用 Axios、EventSource 或 WebSocket？

## 核心回答

当前接口是 POST，还要发送消息历史和自定义请求头，Fetch 可以直接读取响应体的 `ReadableStream`。原生 EventSource 通常使用 GET，也不方便发送这些头；WebSocket 适合持续双向通信，但这个场景主要是一问一答的单向响应流，连接管理更重。Axios 在不同环境下对浏览器流式响应的处理方式不如直接用 Fetch 清楚。当前选择适合现有接口约定，但如果需要断线续传、双向实时事件或长连接复用，我会重新评估 EventSource 或 WebSocket。

## 回答要点

- 当前接口是 POST，还要发送消息历史和自定义请求头，Fetch 可以直接读取响应体的 ReadableStream。
- 原生 EventSource 通常使用 GET，也不方便发送这些头；
- WebSocket 适合持续双向通信，但这个场景主要是一问一答的单向响应流，连接管理更重。
- Axios 在不同环境下对浏览器流式响应的处理方式不如直接用 Fetch 清楚。

## 面试官可能追问

- 关于“AI 流式请求为什么用 Fetch，不用 Axios、EventSource 或 WebSocket”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [AI.tsx，第 149～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：POST 请求、消息历史和自定义头。
> - [AI.tsx，第 186～205 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：直接读取 Fetch 响应流并解析事件。
