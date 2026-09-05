---
id: vue-diff-algorithm
title: Vue 的 Diff 算法是怎么工作的？
aliases: [diff算法, 虚拟dom, patch, 最长递增子序列]
category: vue
difficulty: 高频
priority: high
projects: []
keywords: [虚拟DOM, 同层比较, key, patchFlag, 最长递增子序列]
---

# Vue 的 Diff 算法是怎么工作的？

## 核心回答

数据变了不是整页重画。Vue 先用 VNode 在 JS 里描述 DOM 树，数据更新后生成一棵新树，diff 就是逐个比较新旧两棵树找出最小改动，再用 patch 更新真实 DOM。比较时只做同层比较、不跨层，因为实际业务里节点很少跨层移动，同层比就够了。

列表里加 key 的意义就在这：key 是节点的唯一标识，diff 靠它认出"这个节点就是原来那个"，能复用就复用，只是挪位置就不重建。用数组下标当 key，头部插入一条数据，后面所有节点的 key 全部错位，等于整个列表重渲染，还可能带出输入框内容串位的 bug。

## 展开回答

Vue3 比 Vue2 快，一大半快在编译期。模板是静态可分析的，编译器会给动态节点打 patchFlag，diff 时只比有标记的；纯静态节点做静态提升，只创建一次反复用；动态节点收集成 block tree，更新时直接跳过静态内容。列表 diff 也换了算法：Vue2 是双端比较，Vue3 先预处理掉头尾相同的节点，剩下的靠最长递增子序列算出最少移动方案。所以被问"Vue3 为什么快"，答案就是 Proxy 加这套编译优化。

## 面试官可能追问

- 为什么不建议用 index 当 key？
- patch 时怎么判断两个节点是同一个？
- Vue3 的编译优化有哪些？
