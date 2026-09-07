---
id: typescript-api-state-union
title: 如何用联合类型表达请求状态和错误？
aliases: [请求状态联合, API 状态类型, discriminated union API]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [TypeScript, loading, error, success, 联合类型]
---

# 如何用联合类型表达请求状态和错误？

## 核心回答

我会用带 `status` 的可辨识联合表达 `idle`、`loading`、`success` 和 `error`，让每个分支只拥有自己能访问的字段：success 有 data，error 有 message 和可选 code。这样 UI 的 switch 在漏掉新状态时能通过 `never` 提醒，而不是四个布尔值组合出 loading 且 success 的矛盾状态。网络错误、业务错误和字段解析错误也可以分别建模，页面再决定如何呈现。

## 追问：为什么不写 loading、error、data 三个字段？

三个独立字段允许出现互相冲突的组合，比如 error 不为空但 data 也被当成最新成功结果。联合类型把合法状态写进类型，更新时必须整体替换。若确实需要保留旧 data，再给 stale 或 previousData 设计明确字段，不要靠隐含约定。

## 追问：类型安全和接口真实返回不一致怎么办？

边界处先接 unknown，解析状态和字段，再转换成内部联合类型；解析失败进入 error，而不是用 `as Success` 强行通过。接口合同变更时同时更新 mock、测试和监控，线上发现未知状态也要有可观测记录。

