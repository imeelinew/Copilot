---
id: yingke-movies-normal-040-error-handling
title: 接口结果和错误状态
aliases: [请介绍一下项目中的接口结果和错误状态。, 你在接口结果和错误状态方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [请求封装, 地址管理, 验证方法, 分页, 错误分层]
---

# 接口结果和错误状态

## 核心回答

接口验证不能只看 HTTP 200。我会同时检查请求地址、方法、分页参数、响应状态、业务字段和页面最终展示，并分别模拟网络断开、HTTP 404/500、HTTP 200 但业务字段缺失、空列表和详情无 `pic` 的情况。预期是页面能区分成功、空数据和失败，而不是继续读取不存在的字段。当前请求层没有完整的状态分层，页面也没有 catch 和错误 UI，因此这部分属于后续需要补齐的验证和实现。

## 回答要点

- 接口验证不能只看 HTTP 200。
- 我会同时检查请求地址、方法、分页参数、响应状态、业务字段和页面最终展示，并分别模拟网络断开、HTTP 404/500、HTTP 200 但业务字段缺失、空列表和详情无 pic 的情况。
- 预期是页面能区分成功、空数据和失败，而不是继续读取不存在的字段。
- 当前请求层没有完整的状态分层，页面也没有 catch 和错误 UI，因此这部分属于后续需要补齐的验证和实现。

## 面试官可能追问

- 关于“接口结果和错误状态”，你为什么选择当前方案？
- “接口结果和错误状态”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [utils/request.js 第 13～24 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:13>)：当前请求成功、失败的判定入口。
> - [utils/request.js 第 47～58 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:47>)：当前响应解包和异常传递逻辑。
> - [pages/detail/index.vue 第 1～9 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:1>)：返回字段缺失时可能受影响的详情模板。
