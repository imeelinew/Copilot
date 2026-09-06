---
id: yunshu-smart-city-normal-037-homepage-partial-failure
title: 首页失败隔离和图表大数据处理有限
aliases: [请介绍一下项目中的首页失败隔离和图表大数据处理有限。, 你在首页失败隔离和图表大数据处理有限方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [首页数据, 数据可视化, 性能优化, Promise.allSettled, Promise.all, 加载状态]
---

# 首页失败隔离和图表大数据处理有限

## 核心回答

首页四个概览接口用 `Promise.all`，一个失败会让这一组都进入失败路径；图表编辑器则拿到行数据后在浏览器聚合，再截取前 50 个结果。当某个首页服务短暂不可用，用户可能看不到其他已经成功的数据；当查询数据量增大时，浏览器遍历和内存开销会上升，而截取前 50 项也不代表有明确业务排序。改进时首页可以按卡片维护 loading、error 和 data，使用 `allSettled` 部分展示；图表应把聚合、排序、过滤和限制交给服务端或数据库，返回明确的 Top N。面试时我会把现有方案限定在当前数据规模，不会声称已经完成大数据性能优化。

## 回答要点

- 首页四个概览接口用 Promise.all，一个失败会让这一组都进入失败路径；
- 图表编辑器则拿到行数据后在浏览器聚合，再截取前 50 个结果。
- 当某个首页服务短暂不可用，用户可能看不到其他已经成功的数据；
- 当查询数据量增大时，浏览器遍历和内存开销会上升，而截取前 50 项也不代表有明确业务排序。

## 面试官可能追问

- 关于“首页失败隔离和图表大数据处理有限”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Dashboard.tsx，第 486～500 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：四个首页接口作为一个 Promise.all 批次。
> - [chartDataTransform.ts，第 101～174 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:101)：浏览器遍历、聚合并按插入顺序截取 50 项。
> - [ChartEditor.tsx，第 258～297 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:258)：查询整批行数据后在前端转换并生成 option。
