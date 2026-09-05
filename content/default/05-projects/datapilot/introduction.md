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

## 30 秒回答

城市视图是我独立完成前端的城市数据可视化管理平台，使用 React、TypeScript、Redux Toolkit、Ant Design 和 ECharts。它包括指标仪表盘、动态图表配置、地图、三维场景、AI 数据助手和角色权限。我重点处理了多接口并行加载、图表自适应、配置驱动渲染以及菜单和页面两层权限。

## 标准回答

城市视图是面向城市运营和数据分析人员的数据可视化管理平台，前端由我独立完成。技术栈包括 React、TypeScript、Redux Toolkit、React Router、Ant Design、ECharts、React Three Fiber 和高德地图 JS API。

首页会并行获取城市概览、事件、公共设施和交通排行等数据，并提供定时刷新与 CSV 导出。图表编辑器支持选择数据源、数据表和字段，再配置柱状图、折线图、饼图和散点图并实时预览。地图页会根据城市环境数据绘制标记点和空气质量覆盖层，三维页面则把人口、面积和 GDP 映射为可以切换的三维数据柱。

系统还使用 Redux Toolkit 持久化登录状态，根据角色递归过滤菜单，并通过受保护路由控制页面访问。这个项目让我练习了复杂后台应用的状态组织、第三方可视化库生命周期和配置驱动开发。

## 回答要点

- 明确前端独立完成。
- 从仪表盘、图表配置、地图 3D、权限四部分概括。
- 选择一个模块深入，不要把所有功能平铺。

## 面试官可能追问

- ECharts 如何适配容器尺寸？
- 菜单权限和路由权限有什么区别？
- 为什么使用 Promise.all？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Dashboard/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/ChartEditor/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/MapView/index.tsx
