---
id: vue-lifecycle
title: Vue 的生命周期有哪些？
aliases: [生命周期钩子, mounted, beforeUnmount, 父子生命周期顺序]
category: vue
difficulty: 高频
priority: high
projects: [智服工单, 轻购]
keywords: [created, mounted, beforeUnmount, setup, activated]
---

# Vue 的生命周期有哪些？

## 核心回答

按一条线记：创建、挂载、更新、销毁。Vue2 里是 beforeCreate/created、beforeMount/mounted、beforeUpdate/updated、beforeDestroy/destroyed。Vue3 把销毁那对改了名，beforeUnmount 和 unmounted，其他一样。用组合式 API 的话，就写成 onMounted、onBeforeUnmount 这些函数放在 setup 里；beforeCreate 和 created 没有对应钩子，setup 本身就比它们还早执行。

实际干活高频的就几个：created 时数据能用了但 DOM 还没有，适合发请求、初始化数据；mounted 时 DOM 已经挂上，适合操作 DOM、初始化 ECharts 这种需要容器的库；beforeUnmount 里清定时器、解绑全局事件，不然容易内存泄漏。

## 展开回答

keep-alive 缓存的组件不销毁，激活和离开走的是 activated 和 deactivated，它的销毁钩子不会执行，清理逻辑要放对地方。

父子组件的顺序也有讲究：挂载时先父 created，再子 created、子 mounted，最后父 mounted，所以请求写在父组件的话，子组件 mounted 时大概率 props 已经有数据了。销毁反过来，先子后父。

## 面试官可能追问

- 请求一般放 created 还是 mounted？怎么选？
- 父子组件挂载和销毁的顺序分别是什么？
- Vue3 的 setup 和 beforeCreate 谁先执行？
