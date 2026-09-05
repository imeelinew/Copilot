---
id: vue-mvvm
title: MVVM 和 MVC 有什么区别？
aliases: [mvvm, mvc, 数据驱动视图, 双向绑定]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [MVVM, MVC, ViewModel, 数据驱动]
---

# MVVM 和 MVC 有什么区别？

## 核心回答

MVC 是 Model-View-Controller，用户操作走到 Controller，由它去改数据、刷视图。功能一多 Controller 就特别臃肿，又管业务又管渲染，不好维护。

MVVM 是 Model-View-ViewModel，中间这层 ViewModel 专门负责数据和视图的关联：开发者只管改数据，视图自动跟着变，这就是常说的数据驱动视图。Vue 里干 ViewModel 这层活的，就是响应式系统加模板编译：数据被劫持，模板被解析成对数据的依赖，数据一变自动找到对应的地方去更新。

## 展开回答

Vue 官方说过它并没有完全遵循 MVVM，但核心思想是一致的，这么答就够，不用硬套。相关的还有"双向绑定"这个词：表单用 v-model 时数据变视图变、视图变数据也变，其实没有任何魔法，就是响应式加事件监听两件事拼在一起。

对比的直接感受是：操作 DOM 的思路是"找到元素、改它"，数据驱动的思路是"改数据，剩下交给框架"。

## 面试官可能追问

- Vue 是严格的 MVVM 吗？
- 双向绑定和响应式是一回事吗？
- 数据驱动和 jQuery 那种直接操作 DOM 的方式差在哪？
