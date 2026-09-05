---
id: engineering-redux-async
title: Redux 里异步请求放在哪处理？
aliases: [redux异步, redux-thunk, createAsyncThunk, redux-saga]
category: engineering
difficulty: 高频
priority: normal
projects: [城市视图]
keywords: [thunk, saga, createAsyncThunk, 异步action]
---

# Redux 里异步请求放在哪处理？

## 核心回答

前提是 reducer 必须是纯函数，发请求这种有副作用的活不能放 reducer 里，也不能直接 dispatch 一个"异步的 action"，因为 dispatch 收的得是普通对象。所以异步是在 action 这一层解决的。

老 Redux 的答案是 redux-thunk：它让 dispatch 能接收一个函数，函数里随便发请求，拿到结果再 dispatch 普通的 action。更复杂的异步编排有 redux-saga，把异步流集中在一个地方管理，能处理竞态、防抖这类场景，但要写 generator，门槛高。

现在我项目里用的是 Redux Toolkit 的 createAsyncThunk：传进去一个请求函数，它自动派发 pending、fulfilled、rejected 三种 action，我在 slice 的 extraReducers 里分别处理 loading 和 error，组件只管订阅状态渲染。

## 展开回答

竞态是真实会踩的：快速切 tab 时，旧请求后回来把新数据覆盖了。我的处理是请求前记一个标识，回来发现不是最新的一次就丢掉结果，保证 store 里永远是最新的。

## 面试官可能追问

- 为什么 reducer 不能有副作用？
- thunk 和 saga 怎么选？
- 请求竞态你是怎么处理的？
