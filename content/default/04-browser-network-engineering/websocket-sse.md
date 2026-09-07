---
id: browser-websocket-sse
title: WebSocket 和 SSE 怎么选择？
aliases: [实时通信, Server-Sent Events, WebSocket SSE]
category: engineering
difficulty: 进阶
priority: high
projects: []
keywords: [WebSocket, SSE, 实时数据, 重连]
---

# WebSocket 和 SSE 怎么选择？

## 核心回答

WebSocket 建立后可以双向通信，适合聊天、协同编辑、需要客户端和服务端频繁互发消息的场景。SSE 是服务端向浏览器单向推送，浏览器用 EventSource 或 fetch 流读取，适合进度、通知和 AI 逐字输出，协议和断线重连相对简单。

选型还要看代理、超时、鉴权和部署。SSE 响应要保持 `text/event-stream`，中间层不能把数据一直缓冲；WebSocket 则要确保升级连接和连接数管理。两者都不是“连上就万事大吉”，都需要心跳、重连、关闭和权限校验。

## 追问：SSE 为什么要处理残留 buffer？

网络分片不一定刚好按事件边界到达，一次 read 可能只有半行，也可能包含多个事件。客户端要把新数据接到 buffer，按空行切完整事件，最后未完成的部分留到下一次，不能每个 chunk 直接 JSON.parse。

## 追问：断线重连会不会重复消息？

可能会。服务端可以带事件 ID，客户端重连时带 Last-Event-ID；业务层还要设计幂等，不能因为重连就重复保存一条消息。没有 ID 时至少要在客户端记录已处理的消息标识。

## 追问：鉴权放在哪里？

WebSocket 可以在握手时通过 Cookie 或受控 token 鉴权；SSE 的 EventSource 原生对自定义 header 支持有限，常见做法是 Cookie、短期签名 URL，或用 fetch 自己读取流。无论哪种方式，服务端都必须再次验证权限，不能只相信前端菜单。
