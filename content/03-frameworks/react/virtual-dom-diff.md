---
id: react-virtual-dom-diff
title: 虚拟 DOM 是什么？diff 是怎么工作的？
aliases: [虚拟dom, diff算法, react diff, 协调]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [虚拟DOM, diff, reconciliation, fiber, key]
---

# 虚拟 DOM 是什么？diff 是怎么工作的？

## 核心回答

虚拟 DOM 就是用 JS 对象描述真实 DOM 的结构。state 变了以后，React 先算出一棵新的对象树，跟旧树比一遍，这个比较过程叫 diff，官方叫 reconciliation（协调）。比出来哪几个节点要改，再一次性把这批改动应用到真实 DOM 上。所以它不是说比直接操作 DOM 快，而是把操作量算到最小，保证性能下限。

通用的算法去比较两棵树，复杂度是 O(n³)，节点一多就算不动了。React 靠几条启发式假设把它降到了接近 O(n)：只做同层比较，节点跨层级移动的情况很少，真跨了就当旧的删掉、新的重建；元素类型不一样也不细比，直接重建这一块子树，类型相同才继续比 props 和 children；同一层的列表靠 key 认节点身份。

这套机制还有个附带好处：虚拟 DOM 是纯 JS 对象，不绑死在浏览器上，所以 React 能拿同一套描述去做服务端渲染和 React Native。

## 展开回答

React 16 之后这套更新跑在 Fiber 架构上，渲染被拆成一个个小任务，可以中断、可以让路，避免一次大更新把主线程卡死，这也是并发特性的基础。diff 只负责算出"改什么"，真正动 DOM 是在 commit 阶段同步完成的。

另外有一句话别说错：为了 diff 性能应该用 CSS 隐藏节点而不是卸载——这不是铁律。条件渲染卸载组件和 display:none 藏起来是两种语义，前者状态会丢、后者一直占着渲染，看需求选。

## 面试官可能追问

- 为什么 diff 能从 O(n³) 降到 O(n)？
- 虚拟 DOM 一定比直接操作 DOM 快吗？
- Fiber 是什么，解决了什么问题？
