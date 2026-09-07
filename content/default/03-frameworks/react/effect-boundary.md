---
id: react-effect-boundary
title: React 里什么时候应该用 useEffect？
aliases: [useEffect 使用场景, 不要滥用 Effect, Effect 和事件]
category: react
difficulty: 进阶
priority: high
projects: []
keywords: [useEffect, Effect, 副作用, render, 事件]
---

# React 里什么时候应该用 useEffect？

## 核心回答

Effect 是把组件和外部系统同步的地方，比如订阅、定时器、网络请求或第三方实例。它不是“数据变化以后都要走的一段代码”。如果只是根据已有 props 和 state 算一个值，直接在 render 里计算或用 useMemo 就行，再加一个 Effect 和中间 state 反而多了一次渲染。

事件处理器负责用户明确触发的动作，比如点击提交订单；Effect 负责组件因为渲染而需要建立的连接，比如页面出现后订阅消息。区分清楚以后，依赖数组和清理函数都更容易写对。

## 追问：Effect 的清理什么时候执行？

下一次依赖变化、组件卸载前，React 会先执行上一次的清理，再运行新的 Effect。开发环境 Strict Mode 还可能故意执行一次 setup-cleanup-setup 来帮助发现不完整的清理，不能把它当成生产重复请求的证据。

## 追问：依赖数组能不能故意少写？

不应该。Effect 读取的响应式值都可能是依赖，少写会把旧值留在闭包里。若某个值本来不该触发 Effect，应该重构代码或把稳定的逻辑移出去，而不是靠 eslint-disable 压掉提醒。

## 追问：请求怎么避免旧结果覆盖新结果？

每次 Effect 建立请求时创建 AbortController，清理时取消；同时在 resolve 时检查这次请求仍然有效。取消只是减少浪费，结果校验负责防止已经返回的旧响应改掉当前状态。
