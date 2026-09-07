---
id: react-state-snapshot
title: React 为什么说 state 是一次 render 的快照？
aliases: [React setState 不立即更新, state snapshot, 批处理]
category: react
difficulty: 进阶
priority: high
projects: []
keywords: [state, snapshot, batching, setState, React]
---

# React 为什么说 state 是一次 render 的快照？

## 核心回答

组件函数每执行一次，就拿到那一轮 render 的 state 快照。调用 setter 是告诉 React“请用新值再渲染一次”，不会把当前函数里已经拿到的变量改掉。所以同一个点击处理函数里连续写三次 `setCount(count + 1)`，通常只会得到加一。

如果更新依赖前一个值，我会写函数式更新：`setCount(value => value + 1)`。这样 React 可以按队列顺序把每次更新接起来，也不会因为批处理或闭包拿到旧值。

## 追问：React 为什么要批处理？

批处理能把一次事件里的多次更新合并，减少重复 render。React 18 以后，很多异步回调里的更新也会批处理。写代码时不要依赖“调用 setter 后立刻读到新值”，需要新值就从下一次 render 或函数式更新里拿。

## 追问：怎么在更新后做事？

如果是响应状态变化后同步外部系统，可以用 Effect；如果是按钮点击直接触发的提交，就放在事件处理里。不要为了“等 state 更新”随便套 setTimeout，时序会更不清楚。

## 追问：为什么直接改对象 state 不行？

React 主要通过引用变化判断是否需要更新。直接改原对象再传回同一个引用，可能让 React 认为没有变化，也破坏了上一轮快照的可预测性。应该复制实际修改的那一层，再设置新对象。
