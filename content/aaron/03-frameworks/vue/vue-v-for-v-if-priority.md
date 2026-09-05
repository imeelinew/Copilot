---
id: vue-v-for-v-if-priority
title: v-for 和 v-if 谁的优先级高？
aliases: [v-for v-if优先级, v-for同时v-if]
category: vue
difficulty: 基础
priority: normal
projects: []
keywords: [v-for, v-if, 优先级, computed过滤]
---

# v-for 和 v-if 谁的优先级高？

## 核心回答

Vue2 里 v-for 比 v-if 高，Vue3 反过来，v-if 更高。这个变化有实际影响：Vue3 里在同一个标签上写 v-for 和 v-if，v-if 先执行，这时 v-for 的循环变量还不存在，直接报错，所以这种写法在 Vue3 里基本等于禁用。ESLint 的 vue/no-use-v-if-with-v-for 规则在两个版本里都建议别这么写。

正确姿势是想清楚语义：要"过滤列表"，用 computed 先算出过滤后的数组，再对结果 v-for；要"整块按条件显示"，v-if 放外层标签，v-for 放里面。

## 展开回答

Vue3 改优先级的原因也好说：v-for 优先时每一项都要先渲染再判断条件，白做功；v-if 在前，语义上也更直白。另外 v-for 一定记得配 key，别用数组下标当 key，这在 diff 那边会出问题。

## 面试官可能追问

- v-for 里同时写 v-if 会有什么问题？
- 过滤列表的正确写法是什么？
- v-for 为什么必须加 key？
