---
id: yunshu-smart-city-normal-027-request-cancellation-ai-message-order
title: 快速连续发送 AI 问题会不会乱序？
aliases: [能具体解释一下快速连续发送 AI 问题会不会乱序吗？, 从设计取舍看，快速连续发送 AI 问题会不会乱序？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [请求取消, React, 智慧城市]
---

# 快速连续发送 AI 问题会不会乱序？

## 核心回答

每次发送都会创建一个唯一的助手消息 ID，后续流式事件只更新对应 ID，所以两次请求不会把文本拼到同一个气泡里。但当前没有锁定发送按钮、请求队列或 AbortController，后发请求可能先结束；而且第二次发送时读取的是当前闭包里的 messages，如果第一次回答仍在流式更新，历史上下文可能不完整。因此 UI 能区分消息归属，但对话顺序和上下文一致性还不够严格。

## 回答要点

- 每次发送都会创建一个唯一的助手消息 ID，后续流式事件只更新对应 ID，所以两次请求不会把文本拼到同一个气泡里。
- 但当前没有锁定发送按钮、请求队列或 AbortController，后发请求可能先结束；
- 而且第二次发送时读取的是当前闭包里的 messages，如果第一次回答仍在流式更新，历史上下文可能不完整。
- 因此 UI 能区分消息归属，但对话顺序和上下文一致性还不够严格。

## 面试官可能追问

- 关于“快速连续发送 AI 问题会不会乱序”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [AI.tsx，第 101～126 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:101)：每次发送创建消息 ID，并按 ID 增量更新。
> - [AI.tsx，第 303～324 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:303)：发送期间未禁用输入或取消上一请求。
