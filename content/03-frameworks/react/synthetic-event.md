---
id: react-synthetic-event
title: React 合成事件是什么？和原生 DOM 事件有什么区别？
aliases: [合成事件, react事件机制, 事件委托]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [合成事件, 事件委托, 事件冒泡, React17]
---

# React 合成事件是什么？和原生 DOM 事件有什么区别？

## 核心回答

合成事件是 React 自己封装的一套事件系统。它不会给 JSX 上每个 onClick 都真的绑一个监听器，而是在根节点上绑一份（React 16 及更早是绑在 document 上），靠事件冒泡统一收上来再分发，本质就是事件委托。触发后给你的也不是浏览器原生事件对象，而是 React 包过一层的 SyntheticEvent，把各浏览器的差异抹平了，preventDefault、stopPropagation 到哪都是同一套用法。

跟原生事件的区别主要有两点。一是绑定位置不同：原生事件绑在具体 DOM 上，React 是委托到根节点，所以同一个元素上又绑原生事件又绑合成事件时，冒泡阶段原生那个会先触发。二是事件对象不同：原生事件对象是浏览器给的，合成事件是 React 的包装层。

这么设计主要是为了统一管理和性能：上万条的列表也只挂一个监听器，浏览器兼容还自动做了。

## 展开回答

React 17 把委托目标从 document 换成了自己的根容器，多个 React 应用共存时事件不会串，跟原生事件混用时的行为也更符合直觉。另外 React 16 的事件对象是池化的，异步代码里再读 e 会被置空，得调 e.persist() 才行，17 开始把这个机制移除了，事件对象随时可用。

## 面试官可能追问

- React 17 前后事件委托有什么变化？
- 在原生事件里调 e.stopPropagation() 会挡住合成事件吗？
- e.target 和 e.currentTarget 的区别？
