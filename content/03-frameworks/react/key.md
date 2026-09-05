---
id: react-key
title: React 的 key 有什么用？为什么不建议用 index？
aliases: [key的作用, index作key, 列表key]
category: react
difficulty: 高频
priority: high
projects: []
keywords: [key, index, 列表渲染, 复用]
---

# React 的 key 有什么用？为什么不建议用 index？

## 核心回答

key 是同一层列表里每个节点的身份标识。diff 的时候 React 靠 key 判断某个节点是新增、删除、移动，还是原样复用，而不是把整个列表重画一遍。说白了，没有 key，React 只能按位置对应着比；有了稳定的 key，它是按"人"对应着比。

不建议用 index，是因为列表一插入、删除或者排序，index 就跟着位置变了：原来 key=1 的是李四，删掉张三之后 key=1 就变成了王五。React 会以为"1 号还在"，把王五复用成原来李四那个节点。如果列表项是纯文本可能看不出来，但只要组件有自己的状态，比如里面有个输入框，就会出现"我明明删的是第二行，输入内容怎么跑到第三行了"这种经典错乱。

所以 key 要稳定且唯一，优先用数据自带的 id。也别用 Math.random 当 key，每次渲染都在变，等于所有节点每次都重建，比 index 还糟。

## 展开回答

列表不写 key 的时候，React 默认就是拿 index 当 key，所以纯展示、渲染后不再增删排序的静态列表，用 index 问题不大。但只要列表会动态变化，就老老实实用 id。还有一点，key 只要求在兄弟节点之间唯一，不同列表之间重复了没关系。

## 面试官可能追问

- 什么场景下用 index 作 key 能接受？
- key 重复了会发生什么？
- 为什么不能用随机数当 key？
