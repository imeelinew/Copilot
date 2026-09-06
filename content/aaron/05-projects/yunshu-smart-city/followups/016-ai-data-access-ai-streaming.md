---
id: yunshu-smart-city-followup-016-ai-data-access-ai-streaming
title: 追问：你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？
aliases: [能具体解释一下你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染吗？, 从设计取舍看，你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [XSS, React, 智慧城市]
---

# 追问：你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染？

## 核心回答

当前前端能证明的只有这条链路：把历史消息提交到 `/api/ai/chat`，按用户配置添加模型请求头，再把服务端返回的 text 事件追加到页面。欢迎文案提到真实城市查询和内置规则模式，但当前目录没有 AI 服务端代码，也没有数据库查询、向量检索或模型训练代码，所以我不能说项目已经实现 RAG、向量库或训练。模型内容也没有使用完整 Markdown 解析器，只把 `**文字**` 转成 React 的加粗节点，其余内容按文本渲染；这比直接插入原始 HTML 更克制，但不能据此声称整个应用没有 XSS 风险。面试时我只讲自己能从前端代码确认的请求、流解析、状态更新和渲染，服务端能力需要另行核实。

## 回答要点

- 当前前端能证明的只有这条链路：把历史消息提交到 /api/ai/chat，按用户配置添加模型请求头，再把服务端返回的 text 事件追加到页面。
- 欢迎文案提到真实城市查询和内置规则模式，但当前目录没有 AI 服务端代码，也没有数据库查询、向量检索或模型训练代码，所以我不能说项目已经实现 RAG、向量库或训练。
- 模型内容也没有使用完整 Markdown 解析器，只把 文字 转成 React 的加粗节点，其余内容按文本渲染；
- 这比直接插入原始 HTML 更克制，但不能据此声称整个应用没有 XSS 风险。

## 面试官可能追问

- 关于“你的 AI 怎么查数据库？用了 RAG、向量库或大模型训练吗？模型输出怎么渲染”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [AI.tsx，第 48～51 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:48)：城市查询和规则模式属于界面欢迎文案。
> - [AI.tsx，第 79～100 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:79)：只处理双星号加粗的文本渲染。
> - [AI.tsx，第 145～166 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:145)：前端能够确认的 AI 请求链路。
> - [AI.tsx，第 279～281 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:279)：助手消息的实际渲染入口。
