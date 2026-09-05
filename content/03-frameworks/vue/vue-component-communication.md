---
id: vue-component-communication
title: Vue 组件之间怎么通信？
aliases: [组件通信, props emit, provide inject, 兄弟组件通信]
category: vue
difficulty: 高频
priority: high
projects: [智服工单, 轻购]
keywords: [props, emit, provide/inject, mitt, 状态管理, attrs]
---

# Vue 组件之间怎么通信？

## 核心回答

父子最基础：父传子用 props，子传父用 emit 抛事件，父组件上监听。表单类的双向数据直接在组件上用 v-model，少写一堆 props 和事件。

层级深一点的：provide/inject 让祖先注入、后代直接取，不用一层层往下传 props；$attrs 把父传进来但没声明成 props 的属性打包，在中间组件里透传给孙子很方便。全局共享的登录态、字典数据就上状态管理，Vue2 项目用 Vuex，Vue3 用 Pinia。

## 展开回答

事件总线提一下：Vue2 常拿空实例当 EventBus，Vue3 把 $on、$off 移除了，要用得引 mitt 这种库。但我实际项目里更倾向能状态提升就提升到共同父组件，事件总线撒多了数据流向会很难追。

还有 ref 拿到子组件实例直接调方法，偶尔救急可以，别当常规手段，父子耦合太重。Vue3 组合式里子组件默认封闭，要暴露得 defineExpose。

我的习惯是：层级浅用 props/emit，跨多层且数据单一用 provide/inject，真正的全局状态上 Pinia。

## 面试官可能追问

- provide/inject 传的数据是响应式的吗？
- Vue3 里 EventBus 还能用吗？有什么替代？
- v-model 用在组件上是什么原理？
