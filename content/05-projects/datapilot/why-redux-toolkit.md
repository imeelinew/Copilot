---
id: datapilot-why-redux
title: 城市视图为什么选 Redux Toolkit 而不是其他状态方案？
aliases: [为什么用redux, redux和pinia区别, 状态管理选型, redux toolkit优势]
category: datapilot
difficulty: 项目
priority: normal
projects: [城市视图]
keywords: [Redux Toolkit, redux-persist, 状态选型, Context]
---

# 城市视图为什么选 Redux Toolkit 而不是其他状态方案？

## 核心回答

这个选型我是推导过的。先看项目真需要什么：城市视图里有登录会话、用户角色、菜单权限这些真正的全局状态，跨页面共享、刷新还不能丢，那就需要一个带持久化能力的 store。

在 React 生态里 Redux Toolkit 是目前的主流答案，文档和社区资料最全，所以选它。用起来也比老版 Redux 舒服：createSlice 把 action 和 reducer 写在一块，样板代码少很多；更新状态是 immer 风格的写法，写起来直观，产出的还是不可变更新。持久化用 redux-persist，只对 auth 这一个 slice 开白名单，别的状态不落盘。

## 展开回答

反过来说，轻购那个 Vue 3 项目，状态基本是页面局部的，我就没上 Pinia，组合式函数够用。状态方案是按需选的，不是默认全家桶。

也有人会问为什么不用 Context：Context 一更新，消费它的组件会大面积重渲染，加上我需要持久化和 devtools 这些能力，store 方案更合适。调试的时候 Redux DevTools 能看到每次 action 前后的状态变化，查权限问题特别直观。

## 面试官可能追问

- 什么状态不该放进全局 store？
- redux-persist 的白名单怎么配？
- Redux 有什么缺点？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/store/index.ts
- /Users/eli/Dev/datapilot-rebuild/src/store/authSlice.ts
