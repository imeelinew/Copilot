---
id: vue-composable-design
title: Vue 的 composable 应该怎么设计？
aliases: [组合式函数, useSearch, Vue 逻辑复用]
category: vue
difficulty: 进阶
priority: high
projects: []
keywords: [composable, Composition API, use, 逻辑复用]
---

# Vue 的 composable 应该怎么设计？

## 核心回答

一个 composable 最好围绕一个完整的功能，比如搜索或分页，而不是按“所有 ref 放一起”随便抽。它接收必要参数，返回状态、计算值和操作函数，并说明调用时机。请求、定时器和事件监听都要在组件卸载时清理。

我会让返回值尽量稳定、名字表达意图，必要时支持传入 ref 或普通值。逻辑复用的同时不能把页面业务偷偷藏进去，否则调用方看不出它依赖什么、什么时候会发请求。

## 追问：composable 能共享状态吗？

默认每次调用都会创建自己的状态。如果要共享，需要把状态放到模块级、Pinia 或其他明确的 store，并说明生命周期和清理方式。不能因为函数名字相同，就以为不同组件会自动共享数据。

## 追问：搜索 composable 要处理什么？

关键词、loading、结果、错误、请求取消、旧结果保护和清空行为都要定义。组件卸载时取消请求；空关键词时不要发无意义请求；调用方还应该能决定是否自动请求。

## 追问：为什么不把所有页面逻辑都抽成 composable？

抽取有成本。只有逻辑确实复用、变化独立或页面已经难以阅读时才值得抽。只使用一次、且和页面结构紧密绑定的几行代码留在组件里更直观。
