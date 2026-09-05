---
id: datapilot-chart-resize
title: ECharts 如何适配容器尺寸变化？
aliases: [echarts自适应, ResizeObserver, 图表resize, 窗口变化图表]
category: datapilot
difficulty: 项目
priority: high
projects: [城市视图]
keywords: [ECharts, ResizeObserver, dispose, 生命周期]
---

# ECharts 如何适配容器尺寸变化？

## 30 秒回答

我在图表组件挂载后初始化 ECharts，再用 ResizeObserver 监听图表容器，而不是只监听 window.resize。容器尺寸变化时调用 chart.resize；组件卸载时 disconnect observer 并调用 chart.dispose，避免监听器和图表实例残留。

## 标准回答

ECharts 初始化时会根据容器尺寸创建 Canvas，所以侧边栏收缩、栅格变化或父容器变化后，需要主动调用 resize。

我使用 ResizeObserver 直接监听图表容器。它比只监听 window.resize 更准确，因为很多布局变化并不会触发浏览器窗口尺寸变化。回调触发时调用 chart.resize，让图表重新计算宽高。

组件卸载时我会断开 observer，并调用 chart.dispose 释放 Canvas、事件监听和 ECharts 实例。如果只是数据或配置变化，则复用已有实例并调用 setOption，避免重复初始化。

## 回答要点

- 监听容器而不只是 window。
- 数据更新使用 setOption，卸载才 dispose。
- 说明清理资源的重要性。

## 面试官可能追问

- ResizeObserver 回调频繁触发怎么办？
- 为什么不能每次渲染都 echarts.init？
- 图表容器初始宽高为零怎么办？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/components/ChartRenderer/index.tsx
