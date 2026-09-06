---
id: yunshu-smart-city-normal-036-validation
title: 接口运行时校验和错误分层不统一
aliases: [请介绍一下项目中的接口运行时校验和错误分层不统一。, 你在接口运行时校验和错误分层不统一方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [首页数据, TypeScript, 分页, CSV 导出, 高德地图, 错误分层]
---

# 接口运行时校验和错误分层不统一

## 核心回答

TypeScript 接口只在编译期帮助开发，服务端实际返回的数据仍可能缺字段或类型变化。当前刷新接口、地图转换和部分页面做了运行时检查，但首页直接把 `response.data` 断言成目标类型，请求统一层也只特殊处理业务 401 和 5xx。接口返回 HTTP 200、业务码 400，或者字段类型变化时，可能出现空图、错误提示不一致甚至运行时异常。改进时可以用 Zod 一类 schema 在 API 边界校验，同时统一 `{code, message, data}`、HTTP 错误和 Blob 错误的处理规则。面试时我会区分“TypeScript 类型”和“运行时数据校验”，不会说有类型声明就一定安全。

## 回答要点

- TypeScript 接口只在编译期帮助开发，服务端实际返回的数据仍可能缺字段或类型变化。
- 当前刷新接口、地图转换和部分页面做了运行时检查，但首页直接把 response.data 断言成目标类型，请求统一层也只特殊处理业务 401 和 5xx。
- 接口返回 HTTP 200、业务码 400，或者字段类型变化时，可能出现空图、错误提示不一致甚至运行时异常。
- 改进时可以用 Zod 一类 schema 在 API 边界校验，同时统一 {code, message, data}、HTTP 错误和 Blob 错误的处理规则。

## 面试官可能追问

- 关于“接口运行时校验和错误分层不统一”，你为什么选择当前方案？
- “接口运行时校验和错误分层不统一”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [authSession.ts，第 77～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:77)：刷新响应做了业务码和关键字段运行时校验。
> - [mapData.ts，第 31～73 行](/Users/aaron/personal-hub/apps/project-1/src/utils/mapData.ts:31)：地图数据做数字转换和经纬度范围过滤。
> - [Dashboard.tsx，第 486～497 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：首页直接使用类型断言写入响应数据。
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：统一层只专门处理业务 401、业务 5xx 和 HTTP 401/5xx。
