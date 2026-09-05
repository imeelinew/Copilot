---
id: vue-options-vs-composition
title: Options API 和 Composition API 有什么区别？
aliases: [选项式api, 组合式api, composition api, 逻辑复用, mixin]
category: vue
difficulty: 高频
priority: high
projects: [智服工单, 轻购]
keywords: [Options API, Composition API, mixin, composable, setup]
---

# Options API 和 Composition API 有什么区别？

## 核心回答

Options API 按选项分类：data 归 data、methods 归 methods，同一个功能的代码被拆散在各个选项里。组件小的时候挺清晰，组件一大，改一个功能要上蹿下跳找代码。逻辑复用靠 mixin，但 mixin 有两个老毛病：命名冲突，还有数据来源看不出来，读代码根本不知道这个属性是哪个 mixin 塞进来的。

Composition API 按功能组织：一个功能的状态、计算、方法写在一起。要复用就封装成 composable 函数，谁调用谁拥有，没有命名冲突，来源一目了然。而且全程没有 this，都是普通变量和函数，TypeScript 的类型推断也顺。所以 Vue3 把它当主力，同时保留了 Options API，小组件用着其实也不差。

## 展开回答

我两个都在项目里用过：智服工单是 Vue2 的 Options API，轻购是 Vue3 的 script setup。真实感受是表单、列表这种简单页面差别不大；带筛选、联动、好几个弹窗的复杂页面，组合式明显好维护，还能把搜索逻辑抽成 useSearch 这种 composable 给别的页面用。

## 面试官可能追问

- mixin 的问题，composable 是怎么解决的？
- Options API 有没有优势？什么场景用它反而合适？
- composable 和 React Hooks 有什么异同？
