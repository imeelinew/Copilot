---
id: datapilot-map-lifecycle
title: 城市视图地图实例和覆盖物怎样管理生命周期？
aliases: [高德地图生命周期, MapView 清理, 地图覆盖物]
category: datapilot
difficulty: 进阶
priority: high
projects: [城市视图]
keywords: [AMap, MapView, marker, InfoWindow, cleanup]
---

# 城市视图地图实例和覆盖物怎样管理生命周期？

## 核心回答

`MapView` 初始化时加载高德脚本，创建一个地图实例，再根据城市列表创建 marker、AQI 圆圈和 InfoWindow。实例和覆盖物都放在 ref 里，城市或模式变化时更新对应集合，组件卸载时移除事件、覆盖物并 destroy 地图。代码还处理了缺少 key 或安全码的失败提示；环境接口部分失败时仍保留基础点位，避免地图整块消失。

## 追问：为什么不能每次 render 都 init 地图？

地图对象是有副作用的外部实例，每次 render 初始化会重复绑定事件、创建覆盖物并泄漏 WebGL 或 DOM 资源。React render 只描述状态，初始化和销毁放在 Effect 里，并用 ref 保存实例。更新时只改需要变化的图层，避免整张地图反复重建。

## 追问：城市数量增加后怎么优化？

先限制首屏数量和请求范围，再按视口或分页加载；大量点位可以用聚合或实例化，3D 场景再考虑 LOD 和设备降级。点击详情时才加载较重的环境数据，低端设备可以关闭动画。优化前要用真实数量和设备测量首屏时间、内存和帧率，不能只凭感觉换 API。

