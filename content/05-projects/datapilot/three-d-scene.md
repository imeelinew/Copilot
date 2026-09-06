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

React Three Fiber 可以理解为用 React 的组件写法来组织 Three.js 场景，底下用的还是 Three.js。

城市视图里，我让用户切换人口、面积和 GDP，再把当前指标映射成每个城市的柱高。柱体围成一圈，可以旋转观察，鼠标移上去会显示城市名和原始数值。每根柱子封装成一个组件，切换指标后，传进去的高度和显示值跟着更新。

## 追问：柱子的高度具体怎么算？

先按当前选中的指标排序，找到最大值。每个城市的值除以最大值，再乘 4.8，最后加一个 1.2 的基础高度。这样柱子大致控制在 1.2 到 6 之间，小值也能看见。不过加了基础高度以后，柱高就不是严格从零开始的比例，准确比较要看悬停显示的原始值。

## 追问：颜色也代表数值大小吗？

当前不是数值渐变色，是按排序后的索引从固定颜色数组里依次取色，主要为了区分柱子。数值主要通过高度和悬停文字表达，不能把现在的颜色解释成高低程度。

## 追问：切换指标时的动画怎么做？

高度变化后，会先把柱体所在 group 的纵向缩放设得很小，再在 useFrame 里按照每帧经过的时间逐渐加到一。这样柱体会从低到高长出来。这里直接改 Three.js 对象的缩放，不需要每一帧都调用 React 的 setState。

## 追问：城市数量很多会怎么优化？

当前每个城市都是一个独立组件，还没有做实例化。数量很多时，我会先减少同时展示的城市，再评估用 InstancedMesh 合并相似柱体，减少绘制调用。悬停标签也只显示当前需要的，避免一下挂很多 HTML 标签。

## 追问：WebGL 不可用，或者设备很卡怎么办？

当前页面还没有专门的二维降级视图。如果要覆盖这些设备，我会加错误处理，在三维场景初始化失败时改成普通柱状图或表格。展示同样的数据，让用户仍然能查看和比较。

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/pages/Scene3D/components/CityColumn.tsx
