---
id: datapilot-introduction
title: 介绍一下城市视图项目
aliases: [城市视图项目介绍, react数据可视化项目, datapilot]
category: datapilot
difficulty: 必问
priority: high
projects: [城市视图]
keywords: [React, ECharts, Redux Toolkit, 高德地图, Three.js]
---

# 介绍一下城市视图项目

## 核心回答

城市视图是我做的一个城市数据可视化管理平台，主要用 React、TypeScript、Ant Design 和 ECharts，面向查看城市运行数据的人员。

里面有指标仪表盘，可以看交通、环境和城市事件；也能选择数据源和字段，配置图表并预览。另外做了地图、三维数据柱，以及不同角色的页面权限。

我比较想展开讲的是图表配置这一块。用户选好数据和图表类型，就能生成预览，同一个渲染组件也能用于其他图表页面，新增图表时可以复用。

## 追问：图表配置具体是怎么工作的？

用户先选数据源，再选数据表和字段，最后选柱状图、折线图这些类型。前端拿配置去请求数据，再转换成 ECharts 的 option，交给统一的 ChartRenderer 展示。保存的主要是这些配置，后面可以再读取和编辑。

## 追问：你处理了哪些比较具体的问题？

一个是图表容器变化，比如侧栏收起来，窗口没变但图表区域变了，我用 ResizeObserver 监听容器。另一个是图表配置的联动，换数据源就清空旧表和旧字段，避免拿上一份配置继续预览。

## 追问：仪表盘数据怎么加载和刷新？

概览、事件统计、设施、交通排行和最新事件这五个请求互不依赖，所以一起发。页面有手动刷新，也每五分钟自动刷新一次，离开时清掉定时器。当前失败提示还是整体处理，独立重试每块数据还没有做。

## 追问：为什么既有普通图表，又有 3D？

普通统计主要用 ECharts，比较适合准确查看和对比。三维页用 React Three Fiber，把选中的人口、面积或 GDP 映射成柱高，可以旋转观察，悬停看原始值。它是另一种展示方式，不能替代所有二维图表。

## 追问：权限控制做到了什么程度？

前端会根据角色过滤菜单，也会在路由入口检查能不能访问，手动输入地址同样会检查。登录信息和主题状态放在 Redux Toolkit 里并持久化。接口的数据和操作权限还需要服务端校验，菜单隐藏只是前端的一部分。

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Dashboard/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/ChartEditor/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/MapView/index.tsx
