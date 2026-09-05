---
id: react-vue-difference
title: Vue 和 React 有什么区别？你更倾向哪个？
aliases: [vue和react区别, 框架对比, vue react怎么选, 倾向哪个框架]
category: react
difficulty: 高频
priority: high
projects: [轻购, 城市视图]
keywords: [响应式, JSX, 模板, 状态管理, diff]
---

# Vue 和 React 有什么区别？你更倾向哪个？

## 核心回答

最大的区别是数据更新的方式。Vue 是响应式的，数据变了框架自己知道该更新哪，写起来省心；React 是状态不可变，setState 之后组件函数重新跑一遍，靠 diff 算出最小改动，开发者要自己注意不可变更新、控制多余渲染。

写法上，Vue 是模板，能做的事受限，但换来编译期优化；React 用 JSX，本质就是 JS，灵活，但代码风格得靠团队自己约定。状态管理的配套也顺着走：Vue 那边是 Vuex、Pinia，React 是 Redux Toolkit 这些。

倾向的话，入职肯定跟团队走，两个我切换没什么成本；自己的新项目最近更常写 React，主要是喜欢它配 TypeScript 的感觉。

## 展开回答

diff 这层如果被追问：Vue 在编译期做了不少优化，静态节点提升、patch flag 这些，运行时对比的负担小；React 走 Fiber 那套，把渲染拆成可以中断的小任务，优先保证交互流畅。我对这层的理解到这个程度，再往下没读过源码的部分我会如实说，不硬编。

另外 key 的作用在两边是通用的：列表 diff 时帮框架对上"哪个节点是哪个"，所以别用数组下标当 key，列表顺序一变就会出错位的问题。

## 面试官可能追问

- React 为什么要不可变更新？
- 为什么列表不建议用 index 做 key？
- useState 和 Vue 的 ref 使用起来感受有什么不同？
