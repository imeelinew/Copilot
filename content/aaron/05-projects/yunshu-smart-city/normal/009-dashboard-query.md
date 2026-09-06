---
id: yunshu-smart-city-normal-009-dashboard-query
title: 仪表盘管理和动态重查
aliases: [请介绍一下项目中的仪表盘管理和动态重查。, 你在仪表盘管理和动态重查方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Promise.allSettled, Promise.all, 数据可视化]
---

# 仪表盘管理和动态重查

## 核心回答

仪表盘管理允许用户创建、编辑、克隆、删除和查看专题看板。进入某个看板时，前端先获取看板和关联图表，再读取每张图表保存的转换元数据；如果存在元数据，就根据原来的表和字段重新查询数据、重新聚合并生成最新 option。如果单张图没有生成实时 option，页面还能回退到保存时的图表配置，因此一张图失败不会阻止其他图继续处理。采用这种方式，是为了让看板既能保留编辑结果，又有机会显示当前数据。边界是多个图表请求虽然用 `Promise.allSettled` 隔离失败，但失败图表主要依靠旧配置回退，用户不一定能明显知道它展示的是旧数据；删除提示中的“级联删除”是前端文案，最终约束仍要由服务端保证。

## 回答要点

- 仪表盘管理允许用户创建、编辑、克隆、删除和查看专题看板。
- 进入某个看板时，前端先获取看板和关联图表，再读取每张图表保存的转换元数据；
- 如果存在元数据，就根据原来的表和字段重新查询数据、重新聚合并生成最新 option。
- 如果单张图没有生成实时 option，页面还能回退到保存时的图表配置，因此一张图失败不会阻止其他图继续处理。

## 面试官可能追问

- 关于“仪表盘管理和动态重查”，你为什么选择当前方案？
- “仪表盘管理和动态重查”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [Dashboards.tsx，第 125～147 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:125)：仪表盘列表加载和错误状态。
> - [Dashboards.tsx，第 149～225 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:149)：详情加载、城市字典、逐图查询、重新转换和部分失败隔离。
> - [Dashboards.tsx，第 241～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:241)：创建、编辑、克隆和删除操作。
> - [Dashboards.tsx，第 348～419 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:348)：实时图表配置和已保存配置的回退渲染。
> - [dashboards.ts，第 66～112 行](/Users/aaron/personal-hub/apps/project-1/src/api/dashboards.ts:66)：仪表盘列表、详情、增改删和克隆接口。
