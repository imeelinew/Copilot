---
id: yunshu-smart-city-normal-007-ai-streaming
title: AI 助手的流式回答
aliases: [请介绍一下项目中的AI 助手的流式回答。, 你在AI 助手的流式回答方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Token, SSE, 流式解析, Fetch, 请求取消, 列表 Key]
---

# AI 助手的流式回答

## 核心回答

用户在 AI 助手里输入问题后，前端会把当前消息历史连同本次问题发送给 `/api/ai/chat`，先插入一个空的助手消息作为占位，再持续读取服务端返回的数据流。这里用 Fetch，是因为要直接读取 `ReadableStream`；每次拿到的字节块先用 `TextDecoder` 解码，不能马上当成一条完整消息，而是和上一次残留内容拼起来，再按换行拆出 `data:` 事件。收到文本事件就追加到同一个消息气泡，收到完成事件就结束加载。流式请求如果返回 401，也会复用全局 Token 刷新逻辑并只重试一次。用户可以配置自己的 Key、Base URL 和模型名；没有 Key 时前端不发送 Key 请求头，界面说明由后端使用内置规则。这样做让首段内容可以先显示，也让同一个页面兼容规则回答和模型回答。边界是当前目录没有 AI 服务端代码，所以无法证明规则降级和大模型调用内部怎样实现；前端也没有取消请求，SSE 解析只支持当前“一行一个 `data:` JSON”的约定。

## 回答要点

- 用户在 AI 助手里输入问题后，前端会把当前消息历史连同本次问题发送给 /api/ai/chat，先插入一个空的助手消息作为占位，再持续读取服务端返回的数据流。
- 这里用 Fetch，是因为要直接读取 ReadableStream；
- 每次拿到的字节块先用 TextDecoder 解码，不能马上当成一条完整消息，而是和上一次残留内容拼起来，再按换行拆出 data: 事件。
- 收到文本事件就追加到同一个消息气泡，收到完成事件就结束加载。

## 面试官可能追问

- 关于“AI 助手的流式回答”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：读取和保存 AI Key、Base URL、模型名的浏览器配置。
> - [AI.tsx，第 101～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:101)：插入用户消息和助手占位消息，并逐事件更新同一条回复。
> - [AI.tsx，第 145～184 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：构造流式请求头、发送历史消息并处理一次 401 刷新重试。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：ReadableStream、TextDecoder、跨数据块缓冲和 `data:` JSON 解析。
> - [AI.tsx，第 329～382 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:329)：AI 配置表单以及“保存在当前浏览器、无 Key 使用内置规则”的界面说明。
