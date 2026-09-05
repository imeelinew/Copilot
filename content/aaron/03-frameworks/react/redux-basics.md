---
id: react-redux-basics
title: Redux 的核心概念？action、reducer、store 分别是什么？
aliases: [redux基础, redux工作原理, 单向数据流]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [redux, action, reducer, store, dispatch]
---

# Redux 的核心概念？action、reducer、store 分别是什么？

## 核心回答

Redux 是状态管理库，核心就三个东西。store 是全局唯一的状态仓库，整棵状态树放在它那。action 是个普通对象，带个 type 描述"发生了什么"，比如 { type: 'user/login', payload: 用户信息 }。reducer 是纯函数，接收旧的 state 和 action，算出一个新的 state 返回，它自己不改任何东西。

整个流程是单向的：组件想改状态，只能 dispatch 一个 action，store 拿着 action 和旧 state 去 reducer 里算出新 state，订阅了这个状态的组件再跟着更新。没有谁能绕过这条链路直接改 state，所以每次状态变化都可追溯。

状态多了可以用 combineReducers 拆成多个 reducer 各管一块再合并；配合 react-redux，顶层用 Provider 把 store 注下去，组件里用 connect 或者 useSelector 取数据。适合放跨层级共享、需要持久化的全局数据，比如登录信息、权限。

## 展开回答

reducer 必须是纯函数、返回新对象而不是原地改，是为了可预测和可回放：Redux DevTools 能看到每次 action 前后状态的完整变化，还能时间旅行。action 必须是可序列化的普通对象也是同一个原因。老版 Redux 样板代码确实多，action、reducer 分散各处，现在实际项目都用 Redux Toolkit 的 createSlice，把它们写在了一起。

## 面试官可能追问

- reducer 里直接改 state 会怎样？
- dispatch 一个 action 之后内部发生了什么？
- 什么样的状态不该放进 Redux？
