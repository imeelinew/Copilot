---
id: yingke-movies-followup-024-description-toggle-event-propagation
title: 为什么简介区域要阻止事件冒泡？
aliases: [能具体解释一下为什么简介区域要阻止事件冒泡吗？, 从设计取舍看，为什么简介区域要阻止事件冒泡？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [文本展开, 事件冒泡, 页面导航]
---

# 为什么简介区域要阻止事件冒泡？

## 核心回答

因为整个列表项点击后会进入详情，而简介内部还有展开和收起操作。如果点击“展开”时事件继续冒泡，就可能同时触发父级的详情跳转。当前代码在简介区域和操作按钮上使用 `.stop`，就是为了把这两个交互分开：点击卡片进入详情，点击简介只改变文本状态。这属于嵌套点击场景中的事件边界处理。

## 回答要点

- 因为整个列表项点击后会进入详情，而简介内部还有展开和收起操作。
- 如果点击“展开”时事件继续冒泡，就可能同时触发父级的详情跳转。
- 当前代码在简介区域和操作按钮上使用 .stop，就是为了把这两个交互分开：点击卡片进入详情，点击简介只改变文本状态。
- 这属于嵌套点击场景中的事件边界处理。

## 面试官可能追问

- 关于“为什么简介区域要阻止事件冒泡”，你为什么选择当前方案？
- “为什么简介区域要阻止事件冒泡”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 6～6 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:6>)：列表项整体绑定详情跳转。
> - [pages/list/index.vue 第 20～22 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:20>)：简介区域使用 `.stop` 阻止冒泡。
> - [components/descComment.vue 第 3～5 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/descComment.vue:3>)：展开、收起按钮同样使用 `.stop`。
