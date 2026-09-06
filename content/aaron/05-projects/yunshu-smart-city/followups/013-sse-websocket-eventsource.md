---
id: yunshu-smart-city-followup-013-sse-websocket-eventsource
title: AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？
aliases: [能具体解释一下AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource吗？, 从设计取舍看，AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [SSE, WebSocket, Axios, Fetch, 流式解析]
---

# AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource？

## 核心回答

这个场景是用户先提交问题和历史消息，服务端再持续向浏览器返回回答，主要是一次请求对应一条单向输出流，不一定需要 WebSocket 的长期双向连接。当前接口还要求 POST JSON，并携带 Authorization 和自定义模型头；Fetch 可以同时满足这些要求，并直接读取响应体的 `ReadableStream`。原生 EventSource 更适合 GET 式订阅，不方便携带当前请求体和自定义头；项目里的 Axios 封装则按普通完整响应处理，没有接入逐块读取。这里说的 SSE 是按 `data:` 事件格式解析的 HTTP 流。它适合当前问答协议，但如果以后需要持续双向协作、服务端主动推送多类事件或连接复用，再考虑 WebSocket。

## 回答要点

- 这个场景是用户先提交问题和历史消息，服务端再持续向浏览器返回回答，主要是一次请求对应一条单向输出流，不一定需要 WebSocket 的长期双向连接。
- 当前接口还要求 POST JSON，并携带 Authorization 和自定义模型头；
- Fetch 可以同时满足这些要求，并直接读取响应体的 ReadableStream。
- 原生 EventSource 更适合 GET 式订阅，不方便携带当前请求体和自定义头；

## 面试官可能追问

- 关于“AI 为什么用 SSE，不用 WebSocket？为什么用 fetch，不统一走 Axios 或原生 EventSource”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：POST、JSON 请求体、自定义请求头和 Fetch 调用。
> - [AI.tsx，第 186～205 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：读取响应流并解析 `data:` 事件。
> - [request.ts，第 11～33 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:11)：普通 Axios 实例按完整请求和响应处理。
