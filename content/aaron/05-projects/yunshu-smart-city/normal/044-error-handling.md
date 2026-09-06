---
id: yunshu-smart-city-normal-044-error-handling
title: 接口业务结果、文件导出和异常状态
aliases: [请介绍一下项目中的接口业务结果、文件导出和异常状态。, 你在接口业务结果、文件导出和异常状态方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [验证方法, CSV 导出, 高德地图, Three.js, 错误分层]
---

# 接口业务结果、文件导出和异常状态

## 核心回答

接口验证要建立 HTTP 状态和业务状态的组合用例，包括 HTTP 200 加业务 200、HTTP 200 加业务 401、HTTP 200 加业务 500、HTTP 401、HTTP 500、超时和字段缺失。页面只有在业务成功且关键数据存在时才能更新；CSV 还要检查响应类型、文件名、编码、表头和内容，不能只看到下载动作就认为导出成功。地图、3D 和看板还要分别检查加载、空数据、部分失败和完全失败状态。当前代码对部分组合有处理，但没有证据表明这些接口场景在本次已经跑过。

## 回答要点

- 接口验证要建立 HTTP 状态和业务状态的组合用例，包括 HTTP 200 加业务 200、HTTP 200 加业务 401、HTTP 200 加业务 500、HTTP 401、HTTP 500、超时和字段缺失。
- 页面只有在业务成功且关键数据存在时才能更新；
- CSV 还要检查响应类型、文件名、编码、表头和内容，不能只看到下载动作就认为导出成功。
- 地图、3D 和看板还要分别检查加载、空数据、部分失败和完全失败状态。

## 面试官可能追问

- 关于“接口业务结果、文件导出和异常状态”，你为什么选择当前方案？
- “接口业务结果、文件导出和异常状态”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [request.ts，第 73～110 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:73)：业务 401/5xx 和 HTTP 401/5xx 的分支。
> - [authSession.ts，第 77～100 行](/Users/aaron/personal-hub/apps/project-1/src/services/authSession.ts:77)：刷新接口的数据结构和业务结果校验。
> - [Dashboard.tsx，第 94～124 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:94)：Blob 下载动作和对象 URL 清理。
> - [Map.tsx，第 395～407 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:395)：地图加载、错误和空数据状态。
