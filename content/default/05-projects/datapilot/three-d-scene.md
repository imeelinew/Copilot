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

## 核心回答

React Three Fiber 不是另一个 Three.js，它就是 Three.js 的 React 渲染器：底下还是场景、相机、材质那一套，只是可以用声明式组件的写法来搭。

城市视图的三维页面是把人口、面积、GDP 变成柱体。关键是先做归一化——这三个量纲差太远，不处理的话大城市会把其他柱体压得看不见。归一化之后按比例映射成柱体高度，颜色用梯度表示数值强弱，指标可以切换，每个城市一根柱子，点击能看到具体数值。

## 展开回答

用 R3F 而不是裸写 Three.js，主要是组件化和数据流：柱体是一个可复用组件，切换指标就是一次普通的 React 状态更新，不用命令式地遍历场景对象改来改去。

性能上有几个注意点：柱体特别多要考虑实例化渲染，合并绘制调用；静态场景不用每帧都渲染，按需来；卸载时 geometry 和 material 要释放，不然 WebGL 资源会泄漏。和 ECharts 的分工我也想清楚了：常规统计图表用 ECharts 效率高，需要空间位置表达的数据才上 3D，不为炫技。

## 面试官可能追问

- 为什么用 R3F 不直接写 Three.js？
- 城市数量很多时怎么优化？
- WebGL 不可用怎么办？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/components/CityColumn.tsx
