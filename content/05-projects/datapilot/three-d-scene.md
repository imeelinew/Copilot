---
id: datapilot-3d-scene
title: 3D 数据柱是怎么实现的？React Three Fiber 和 Three.js 什么关系？
aliases: [r3f, three.js, 3d可视化, 三维数据柱]
category: datapilot
difficulty: 亮点
priority: normal
projects: [城市视图]
keywords: [React Three Fiber, Three.js, 场景, 数据映射, 性能]
---

# 3D 数据柱是怎么实现的？React Three Fiber 和 Three.js 什么关系？

## 30 秒回答

React Three Fiber 是 Three.js 的 React 渲染器：底层还是 Three.js 的场景、相机、材质那套体系，只是用声明式组件来写。城市视图的三维页面把人口、面积、GDP 映射成柱体：数据经过归一化决定柱子的高度和颜色梯度，指标可以切换，配合光照和相机角度表达空间对比。每个城市一根柱体组件，数据驱动生成，和页面其他部分共享同一套 React 状态流。

## 标准回答

数据到视觉的映射是核心：先对所有城市的人口、面积、GDP 做归一化，把量纲差异抹平，再按比例映射到柱体高度，颜色用梯度表达数值强弱。不做归一化的话，大城市会把其他柱体压得看不见，可视化就失去意义。

实现上，场景由 Canvas、环境光加方向光、地面和柱体组成。每个城市是一个 CityColumn 组件，接收归一化后的数值生成对应尺寸的 geometry 和带颜色的 material，支持点击查看城市数值。用 R3F 的好处是组件化：柱体是可复用组件，指标切换就是一次普通的 React 状态更新，不需要命令式地遍历修改场景对象。

性能上有几个实际注意点：柱体数量大时考虑实例化渲染（instancing）合并绘制调用；渲染循环避免每帧做无意义的 React 更新，静态场景按需渲染；组件卸载时释放 geometry 和 material，避免 WebGL 资源泄漏。

和 ECharts 的分工我也想得清楚：常规统计图表用 ECharts，开发效率高、交互成熟；需要空间位置表达的数据（城市的地理分布对比）3D 更直观。不为炫技上 3D，而是这类数据确实适合。

## 回答要点

- 一句话讲清 R3F 与 Three.js 的关系，别让面试官觉得你在堆名词。
- 数据归一化是可视化思维的加分点，一定主动说。
- 性能和资源释放体现工程完整性。

## 面试官可能追问

- 为什么用 R3F 而不是直接写 Three.js？
- 城市数量很多时怎么优化？
- 3D 场景加载失败或 WebGL 不可用怎么办？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/components/CityColumn.tsx
