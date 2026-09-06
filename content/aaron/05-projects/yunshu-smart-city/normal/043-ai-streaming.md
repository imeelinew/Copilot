---
id: yunshu-smart-city-normal-043-ai-streaming
title: AI 流式回答和降级
aliases: [请介绍一下项目中的AI 流式回答和降级。, 你在AI 流式回答和降级方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [登录鉴权, 验证方法, 列表 Key, 自动化测试]
---

# AI 流式回答和降级

## 核心回答

AI 至少要验证五类情况：不配置 Key、配置有效 Key、配置错误 Key、服务端中途断流以及登录状态在流式请求中变成 401。不配置 Key 时只能从前端确认没有发送 `X-AI-KEY`，还要结合服务端或接口结果确认是否真的进入规则模式；错误 Key 应显示可理解的失败状态，不能把 HTTP 成功当成回答成功。解析层要用可控流把一个 JSON 拆成多块、把多条事件合成一块，并检查尾部没有换行时的处理。当前没有 AI 流解析测试，也没有在本次执行人工验证，所以降级效果和服务端行为都不能写成已验证事实。

## 回答要点

- AI 至少要验证五类情况：不配置 Key、配置有效 Key、配置错误 Key、服务端中途断流以及登录状态在流式请求中变成 401。
- 不配置 Key 时只能从前端确认没有发送 X-AI-KEY，还要结合服务端或接口结果确认是否真的进入规则模式；
- 错误 Key 应显示可理解的失败状态，不能把 HTTP 成功当成回答成功。
- 解析层要用可控流把一个 JSON 拆成多块、把多条事件合成一块，并检查尾部没有换行时的处理。

## 面试官可能追问

- 关于“AI 流式回答和降级”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [AI.tsx，第 36～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:36)：有 Key 和无 Key 的前端配置状态。
> - [AI.tsx，第 149～184 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：按配置添加请求头，并处理 401。
> - [AI.tsx，第 186～216 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:186)：数据块缓冲和事件解析路径。
> - [AI.tsx，第 128～136 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:128)：流式请求异常时的前端失败文案。
