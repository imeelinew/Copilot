---
id: yunshu-smart-city-normal-010-3d-view
title: 3D 城市人口视图
aliases: [请介绍一下项目中的3D 城市人口视图。, 你在3D 城市人口视图方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [Three.js, 组件设计, 性能优化, React, 高德地图]
---

# 3D 城市人口视图

## 核心回答

3D 视图把城市人口映射成立体柱体，用户可以拖动和缩放，从空间角度比较不同城市的规模。前端先请求城市数据，过滤无效人口，再按人口排序并限制为 20 个城市，用最大人口把柱体高度归一化；每根柱体通过动画逐步升高，场景里加入相机控制、光照和背景。使用 Three.js 的 React 渲染层，是为了用组件方式组织场景对象和动画生命周期。这个模块适合做直观比较，但柱高表达的是相对人口，不是地图上的真实地理高度；颜色、位置和动画是展示规则，不能解释成城市之间存在空间因果关系。WebGL 不可用或设备图形性能较弱时，页面也可能无法正常展示。

## 回答要点

- 3D 视图把城市人口映射成立体柱体，用户可以拖动和缩放，从空间角度比较不同城市的规模。
- 前端先请求城市数据，过滤无效人口，再按人口排序并限制为 20 个城市，用最大人口把柱体高度归一化；
- 每根柱体通过动画逐步升高，场景里加入相机控制、光照和背景。
- 使用 Three.js 的 React 渲染层，是为了用组件方式组织场景对象和动画生命周期。

## 面试官可能追问

- 关于“3D 城市人口视图”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [Scene.tsx，第 72～113 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:72)：20 城上限、城市数据规范化、排序和 WebGL 能力检查。
> - [Scene.tsx，第 131～178 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:131)：人口柱体高度及增长动画。
> - [Scene.tsx，第 219～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:219)：3D 背景、相机控制和场景组成。
> - [Scene.tsx，第 282～356 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:282)：异步请求保护、人口最大值和场景数据计算。
> - [Scene.tsx，第 358～452 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Scene.tsx:358)：加载、错误、空状态和 Canvas 渲染入口。
