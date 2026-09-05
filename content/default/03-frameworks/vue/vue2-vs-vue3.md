---
id: vue2-vs-vue3
title: Vue 2 和 Vue 3 有什么区别？
aliases: [vue2和vue3区别, vue3相比vue2, vue版本区别]
category: vue
difficulty: 高频
priority: high
projects: [轻购, 智服工单]
keywords: [Proxy, Composition API, TypeScript, tree shaking]
---

# Vue 2 和 Vue 3 有什么区别？

## 30 秒回答

我实际使用过 Vue 2 和 Vue 3。Vue 2 主要使用 Options API，并通过 Object.defineProperty 做响应式；Vue 3 增加了 Composition API，响应式底层改为 Proxy，对 TypeScript 的支持也更好。Composition API 更方便按照业务逻辑组织和复用代码，而不是把同一功能拆散在 data、methods 和生命周期里。

## 标准回答

我认为主要区别可以从响应式、代码组织和工程能力三方面说。

响应式方面，Vue 2 主要使用 Object.defineProperty 劫持已有属性，因此新增对象属性和直接修改数组索引存在限制；Vue 3 使用 Proxy 代理整个对象，能够统一拦截更多操作，但也需要通过 WeakMap 等结构缓存代理并处理嵌套对象。

代码组织方面，Vue 2 常用 Options API，逻辑分别放在 data、computed、methods 和生命周期中；Vue 3 提供 Composition API，可以把同一个业务功能的状态、计算和方法放在一起，也更便于抽成 composable。

另外 Vue 3 对 TypeScript、Tree Shaking、多根节点和异步组件等支持更好。我在智服工单中使用 Vue 2，在轻购中使用 Vue 3，比较明显的体验是 Vue 3 配合 script setup 和 TypeScript 时，类型和逻辑组织更自然。

## 深入回答

除了使用方式，二者的应用实例也不同。Vue 2 的全局配置容易影响所有应用，Vue 3 使用 createApp 创建独立实例。生命周期在 Composition API 中采用 onMounted、onBeforeUnmount 等函数。Vue 3 还重写了虚拟 DOM 和编译优化机制，可以通过 patch flag 等信息减少运行时不必要的比较。

## 回答要点

- 不要只回答语法差异。
- 响应式差异要说 Object.defineProperty，而不是 Object.assign。
- 用两个真实项目解释为什么两种版本都熟悉。

## 面试官可能追问

- Vue 2 给对象新增属性为什么不会自动响应？
- Proxy 相比 Object.defineProperty 有什么代价？
- Options API 和 Composition API 应该如何选择？

## 代码证据

- Vue 3：/Users/eli/Dev/mobile-shop/src/views/SearchView.vue
- Vue 2：/Users/eli/Resumes/after-sales-work-order/frontend/src/views/TicketList.vue
