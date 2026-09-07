---
id: react-reducer-context
title: useReducer、Context 和 Redux 怎么取舍？
aliases: [React 状态管理选型, Context Redux, useReducer]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [useReducer, Context, Redux, 状态管理]
---

# useReducer、Context 和 Redux 怎么取舍？

## 核心回答

组件内部状态简单就用 useState；状态转移多、事件和状态关系复杂，可以用 useReducer；父子层级较深但范围不大的共享依赖，可以用 Context。Redux 更适合跨很多页面、需要明确 action 记录、selector 订阅和开发工具的全局状态。

Context 解决的是“怎么把值传下去”，不是完整的状态管理方案。Provider value 变化时，下面订阅它的组件都可能更新，不能把所有业务数据都塞进一个大 Context。选型看状态范围、更新频率、调试需求和团队习惯。

## 追问：哪些状态不该放 Redux？

输入框临时值、弹窗开关、当前 hover、只在一个页面存在的草稿通常放组件里。URL 筛选条件要放 URL，服务端列表数据可以交给请求缓存层。全局 store 只保留真正需要跨页面共享或持久化的状态。

## 追问：reducer 里为什么不能请求接口？

reducer 需要是纯函数，同样的旧 state 和 action 应该得到同样的新 state。请求、时间、随机数都会让结果不可预测，也无法可靠重放。异步放在 thunk、effect 或专门的数据层，成功后再 dispatch 结果。

## 追问：Context 性能怎么处理？

拆分 Provider，保持 value 引用稳定，或者让 Context 只提供 dispatch，把读取交给更细粒度的 selector。优化前先测量，不要看到 Context 就直接换库。
