---
id: react-hoc
title: 高阶组件 HOC 是什么？
aliases: [hoc, 高阶组件, render props]
category: react
difficulty: 高频
priority: normal
projects: []
keywords: [HOC, 高阶组件, 逻辑复用, render props]
---

# 高阶组件 HOC 是什么？

## 核心回答

高阶组件其实不是一个组件，是一个函数：接收一个组件，返回一个新组件，新组件在内部渲染原来的组件并给它加料，比如注入 props、做条件渲染。写出来就是 const withAuth = (Wrapped) => (props) => isLogin ? <Wrapped {...props} /> : <Login />，说白了是个组件工厂。

它典型用来做逻辑复用：鉴权包裹、埋点上报、把请求到的数据当 props 注进去。要点是它不修改原组件，靠组合来增强，原组件拿出去单独用也不受影响。

缺点也明显：多个 HOC 叠起来嵌套层级很深，props 是从哪来的不直观，调试费劲；原组件的静态属性不会被自动带过去，得用 hoist-non-react-statics 这类工具复制；ref 也要 forwardRef 转发一下才能透过去。

## 展开回答

和它同一时代的还有 render props，把一个函数当 prop 传给组件，由组件决定怎么渲染，解决的是同一类逻辑复用问题。现在这两者在业务代码里都少见了，自定义 Hook 基本取代了它们的位置。不过老项目和三方库里 HOC 还很多，比如 react-redux 的 connect 就是一个 HOC，看到得认识。

## 面试官可能追问

- HOC 和自定义 Hook 怎么选？
- connect 是不是高阶组件？
- HOC 和 render props 的区别？
