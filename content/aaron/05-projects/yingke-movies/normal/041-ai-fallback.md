---
id: yingke-movies-normal-041-ai-fallback
title: AI 降级
aliases: [请介绍一下项目中的AI 降级。, 你在AI 降级方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [文本展开, 验证方法, AI Key, 限流, 列表 Key]
---

# AI 降级

## 核心回答

这个项目没有接入 AI 模型、AI Key、流式生成或 AI 降级逻辑，因此不存在可以验证的 AI 降级链路，不能为了回答通用问题临时编造。如果以后增加 AI 推荐或简介生成，才需要验证超时、限流、内容为空、模型不可用时是否回退到普通影视数据，并确保真正的模型密钥保存在服务端而不是客户端。

## 回答要点

- 这个项目没有接入 AI 模型、AI Key、流式生成或 AI 降级逻辑，因此不存在可以验证的 AI 降级链路，不能为了回答通用问题临时编造。
- 如果以后增加 AI 推荐或简介生成，才需要验证超时、限流、内容为空、模型不可用时是否回退到普通影视数据，并确保真正的模型密钥保存在服务端而不是客户端。

## 面试官可能追问

- 关于“AI 降级”，当前方案解决了哪类用户体验问题？
- 模型超时、返回空内容或数据流被截断时怎么处理？
- 这项 AI 能力的实现边界和替代方案是什么？

## 代码证据

>
> - [package.json 第 12～16 行](</Users/aaron/CodingPractice/14_uniapp/project2/package.json:12>)：现有业务依赖只有 UI 和请求相关库，没有 AI SDK。
> - [pages.json 第 2～20 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages.json:2>)：现有业务路由只有首页、列表和详情。
