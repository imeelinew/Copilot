---
id: yunshu-smart-city-normal-030-http-business-status
title: HTTP 200 是否就代表业务成功？
aliases: [能具体解释一下HTTP 200 是否就代表业务成功吗？, 从设计取舍看，HTTP 200 是否就代表业务成功？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [错误分层, 验证方法, CSV 导出]
---

# HTTP 200 是否就代表业务成功？

## 核心回答

不代表。HTTP 200 只说明 HTTP 请求成功返回，业务结果还要看响应里的 `code` 和数据结构。请求拦截器会统一处理业务 401 和业务 5xx，具体页面也经常要求 `code === 200` 才更新状态。当前统一层没有处理全部非 200 业务码，所以页面仍需显式判断；如果返回 Blob，还要按文件内容或响应头验证，不能套普通 JSON 业务码逻辑。

## 回答要点

- HTTP 200 只说明 HTTP 请求成功返回，业务结果还要看响应里的 code 和数据结构。
- 请求拦截器会统一处理业务 401 和业务 5xx，具体页面也经常要求 code === 200 才更新状态。
- 当前统一层没有处理全部非 200 业务码，所以页面仍需显式判断；
- 如果返回 Blob，还要按文件内容或响应头验证，不能套普通 JSON 业务码逻辑。

## 面试官可能追问

- 关于“HTTP 200 是否就代表业务成功”，你为什么选择当前方案？
- “HTTP 200 是否就代表业务成功”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [request.ts，第 73～92 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：HTTP 成功回调中继续处理业务 401 和业务 5xx。
> - [ChartEditor.tsx，第 258～264 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:258)：页面检查业务码和空数据后才生成图表。
> - [cities.ts，第 59～77 行](/Users/aaron/personal-hub/apps/project-1/src/api/cities.ts:59)：导出接口按 Blob 响应处理。
