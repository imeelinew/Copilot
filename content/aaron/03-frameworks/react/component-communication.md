---
id: react-component-communication
title: React 组件之间怎么通信？
aliases: [组件通信, 父子组件传值, context通信]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [props, 回调, Context, 状态提升]
---

# React 组件之间怎么通信？

## 核心回答

父子之间最常用 props：父传子直接传数据；子传父是把父组件的函数当 props 传下去，子组件调它，把数据当参数带回去。兄弟组件就用状态提升，把共享状态放到它们最近的共同父组件里，再各自通过 props 拿。

跨层级用 Context，它是专门给主题、登录用户、语言这种全局数据设计的：顶层 Provider 传 value，底下任何深度的组件用 useContext 直接拿，不用一层层透传。真正复杂、需要持久化和调试工具的全局状态，就上 Redux 这类 store。另外发布订阅（PubSub 这种）也能实现任意组件间通信，但数据流不好追踪，现在基本不推荐了。

## 展开回答

Context 有个要留意的点：value 一变，所有消费它的组件都会重渲染，所以别把高频变化的值塞进 Context。必要的话把"状态"和"更新函数"拆成两个 Provider，再配合 memo 控制重渲染范围。props 一层层透传太多层的时候，除了 Context，还可以用组合的方式，直接把子组件当 children 传下去，中间层就不用帮忙转交了。

## 面试官可能追问

- Context 变化导致大面积重渲染怎么办？
- props 层层透传除了 Context 还有什么办法？
- 什么情况才需要上全局状态管理？
