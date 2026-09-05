---
id: react-lifecycle
title: React 生命周期说说看？哪些被废弃了？
aliases: [react生命周期, 生命周期, getDerivedStateFromProps, 废弃生命周期]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [生命周期, componentDidMount, getDerivedStateFromProps, UNSAFE]
---

# React 生命周期说说看？哪些被废弃了？

## 核心回答

类组件的生命周期分三个阶段。挂载：constructor 初始化 state 和 props，然后 render，最后 componentDidMount 在真实 DOM 挂载完执行，发请求一般放这里。更新：props 或 state 变了，先走 shouldComponentUpdate，返回 false 后面的都不执行，然后 render，完了走 componentDidUpdate。卸载：componentWillUnmount，清定时器、解绑事件这类收尾在这里做。

有三个被废弃了：componentWillMount、componentWillReceiveProps、componentWillUpdate。React 16.3 给它们加了 UNSAFE_ 前缀的别名，开始废弃。原因和 Fiber 有关：新架构下渲染可以被中断再重来，这批 will 系列钩子在这种机制下可能被执行多次，而大家习惯在里面写副作用，一重复执行就出 bug。官方给的替代是两个新钩子：getDerivedStateFromProps，是静态方法，拿不到 this，作用是把 props 映射到 state，但不该无脑把 props 复制进 state；getSnapshotBeforeUpdate，在 DOM 真正更新前拿到更新前的快照，比如滚动位置，作为 componentDidUpdate 的第三个参数传进去。

现在写函数组件对应的是 useEffect，挂载、更新、卸载的活都能干，但不是和生命周期一一对应，别背成"useEffect 就是 componentDidMount"。

## 展开回答

还有个 componentDidCatch，用来捕获子树里的渲染错误，包了它的那部分组件崩了不至于整页白屏，这种组件叫错误边界。面试时能主动讲清楚废弃原因，比干背十几个钩子名字加分得多。

## 面试官可能追问

- 为什么 componentWillMount 这批钩子被废弃？
- getDerivedStateFromProps 为什么设计成静态方法？
- useEffect 和生命周期是怎么对应的？
