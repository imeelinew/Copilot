---
id: vue-vuex
title: Vuex 的核心概念和工作流程是什么？
aliases: [vuex, state mutation action, 状态管理流程]
category: vue
difficulty: 高频
priority: high
projects: [智服工单]
keywords: [state, getter, mutation, action, commit, dispatch]
---

# Vuex 的核心概念和工作流程是什么？

## 核心回答

五个概念：state 存全局共享数据，是响应式的；getter 基于 state 做派生计算，能复用、有缓存；mutation 是唯一能直接改 state 的地方，必须同步；action 里做异步操作，完事 commit 一个 mutation 去改 state；module 用来把大 store 拆成模块。

流程说白了是一条链：组件 dispatch 一个 action，action 里发请求，拿到结果 commit 一个 mutation，mutation 里改 state，state 一变依赖它的组件自动更新。数据永远单向流动，谁改的、什么时候改的都查得到。

mutation 必须同步是因为 devtools 的调试机制：每过一条 mutation 记一次快照，里面混了异步，时间线就对不上了，回溯调试也就废了。

## 展开回答

智服工单这个 Vue2 项目里我用 Vuex 管登录态、用户信息、字典数据。组件里用 mapState、mapGetters、mapActions 这些辅助函数，省掉一堆 this.$store 样板代码。也不是所有改动都要绕 action，纯同步的简单赋值直接 commit mutation 就行，需要异步或者多处复用的逻辑才包成 action。

## 面试官可能追问

- mutation 为什么必须是同步的？
- action 和 mutation 怎么分工？
- Vuex 里的数据刷新页面就丢了，怎么持久化？
