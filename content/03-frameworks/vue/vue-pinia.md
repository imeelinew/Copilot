---
id: vue-pinia
title: 谈谈 Pinia？为什么取代了 Vuex？
aliases: [pinia, vuex区别, 状态管理, defineStore]
category: vue
difficulty: 高频
priority: high
projects: [轻购]
keywords: [Pinia, Vuex, defineStore, TypeScript, 状态管理]
---

# 谈谈 Pinia？为什么取代了 Vuex？

## 核心回答

Pinia 是 Vue 官方推荐的状态管理库，Vuex 4 之后基本处于维护模式，Vuex 官方仓库都说 Pinia 基本就是 Vuex 5，所以新项目没有理由再用 Vuex。它最关键的改动是砍掉了 mutation，只剩 state、getters、actions：action 里同步异步随便写，改 state 也不用绕 commit，心智负担小一大截。

其他优点：TypeScript 支持是完整的类型推导，不用像 Vuex 那样写泛型套娃；没有 module 嵌套，就是平铺的多个 store，各自用 defineStore 定义、自动注册，谁用谁 import，代码分割也自然；DevTools 和 SSR 都支持。

## 展开回答

轻购项目里我用 Pinia 管购物车和登录态：defineStore 里 state 写成返回对象的函数，getters 类似 computed，action 直接就是普通 async 函数，发请求改数据一步到位。从 Vuex 迁移过来的视角看，概念是通的，就是少了 mutation 这一层，上手基本没有成本。

## 面试官可能追问

- Pinia 为什么移除了 mutation？
- 多个 store 之间怎么互相调用？
- 老的 Vuex 项目怎么迁移到 Pinia？
