---
id: vue-component-v-model
title: Vue 组件上的 v-model 是怎么工作的？
aliases: [Vue v-model 原理, defineModel, 自定义组件双向绑定]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [v-model, modelValue, update:modelValue, Vue 组件]
---

# Vue 组件上的 v-model 是怎么工作的？

## 核心回答

在组件上写 `v-model`，本质是把一个值作为 prop 传进去，再监听对应的更新事件。Vue 3 默认是 `modelValue` 和 `update:modelValue`；子组件不能直接改 prop，而是触发事件让父组件更新自己的状态。

这样数据流仍然是单向的，只是把传值和回传写法收进了一个语法糖。输入框、选择器、弹窗这类组件很适合用它，但复杂业务对象要明确哪些字段能改，避免看起来像随便双向修改。

## 追问：多个 v-model 怎么写？

可以给模型加参数，比如 `v-model:visible`，组件对应 `visible` prop 和 `update:visible` 事件。每个模型都要有清楚的语义，不要把整个表单对象和多个独立字段混在一条双向绑定里。

## 追问：子组件为什么不能直接改 prop？

父组件传下来的值属于父组件，子组件直接修改会让数据流变得不可追踪，也可能在下一次父组件更新时被覆盖。触发事件让父组件决定是否接受修改，组件边界会更清楚。

## 追问：v-model 修饰符怎么传？

修饰符会作为额外信息传给组件，组件可以据此做 trim、number 等处理。自定义修饰符要在组件接口里明确说明，不能默认把所有输入都转成数字，避免丢失原始文本。
