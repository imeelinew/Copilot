---
id: yunshu-smart-city-normal-016-sse-stream-decoding
title: 难点 1：SSE 数据块不等于一条完整消息
aliases: [请介绍一下项目中的SSE 数据块不等于一条完整消息。, 你在SSE 数据块不等于一条完整消息方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: high
projects: [云枢智慧城市数据平台]
keywords: [SSE, 流式解析, 验证方法]
---

# 难点 1：SSE 数据块不等于一条完整消息

## 核心回答

AI 流式回答的难点是网络层一次 `reader.read()` 拿到的 chunk，也就是数据块，和业务上的一条 SSE 事件没有一一对应关系。比如服务端发出 `data: {"type":"text","content":"北京"}\n`，网络可能把 JSON 从“北”和“京”之间拆成两块；也可能一次读到两条事件。如果每读一次就直接 `JSON.parse`，前一种会报错，后一种会丢消息。当前代码用流式 `TextDecoder` 解码，把新文本追加到缓冲区，只处理已经出现换行的完整行，最后一段继续保留到下一轮；连接结束后再处理尾部。它仍只接受以 `data: ` 开头、单行 JSON 的事件，没有完整支持 SSE 的多行 data、event、id、注释和断线续传。我会把同一条 JSON 人为拆成多个字节块，再把多条事件合并到一个块里，分别验证消息没有重复或丢失。

## 回答要点

- AI 流式回答的难点是网络层一次 reader.read() 拿到的 chunk，也就是数据块，和业务上的一条 SSE 事件没有一一对应关系。
- 比如服务端发出 data: {"type":"text","content":"北京"}\n，网络可能把 JSON 从“北”和“京”之间拆成两块；
- 也可能一次读到两条事件。
- 如果每读一次就直接 JSON.parse，前一种会报错，后一种会丢消息。

## 面试官可能追问

- 关于“SSE 数据块不等于一条完整消息”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：流式请求和消息历史请求体。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：流读取、跨块缓冲、逐行解析和尾部处理。
> - [AI.tsx，第 112～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:112)：不同事件到达后对同一个助手消息进行增量更新。
