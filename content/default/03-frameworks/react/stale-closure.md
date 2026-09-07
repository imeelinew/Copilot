---
id: react-stale-closure
title: React 的 stale closure 是什么，怎么处理？
aliases: [React 闭包旧值, 定时器读旧 state, 请求竞态]
category: react
difficulty: 进阶
priority: normal
projects: []
keywords: [stale closure, 闭包, useRef, useEffect]
---

# React 的 stale closure 是什么，怎么处理？

## 核心回答

函数会记住它创建那次 render 的变量。如果把这个函数交给定时器、事件监听或异步请求，等它稍后执行时，里面可能还是旧 state，这就是 stale closure。它不是 React 随机丢数据，而是 JavaScript 闭包和 render 快照共同产生的结果。

处理方式看需求：更新 state 用函数式 setter；Effect 需要跟着值变化就把值放进依赖并在清理时重绑；确实只想读取最新值、又不想因此重新订阅时，可以用 ref 保存最新值。ref 不是万能的状态替代品，因为修改 ref 不会触发渲染。

## 追问：setInterval 怎么读取最新计数？

可以让 interval 只负责触发一个函数，函数式更新计数；或者用 ref 同步最新值。更简单的场景是把 interval 放进依赖里，计数变化时重建并清理旧 interval，但要权衡重建成本。

## 追问：useCallback 能解决所有旧值吗？

不能。useCallback 只是缓存函数引用，依赖写错时仍然会缓存旧闭包。先明确函数需要读取哪些值，再决定依赖或改成函数式更新。

## 追问：请求返回顺序怎么处理？

给每次请求一个序号或使用请求控制器。只有当前序号对应的结果才能写入 state，旧请求即使没有成功取消，也只能被忽略。搜索框、切换 tab 和级联选择都需要这种保护。
