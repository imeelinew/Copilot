---
id: engineering-promise-chain
title: 说说 Promise 的状态和链式调用
aliases: [promise原理, promise状态, promise链式, then返回值]
category: engineering
difficulty: 高频
priority: high
projects: []
keywords: [Promise, then, 链式调用, 微任务]
---

# 说说 Promise 的状态和链式调用

## 核心回答

Promise 是异步编程的方案，把回调嵌套变成链式往下写，解决回调地狱。它只有三种状态：pending、fulfilled、rejected，而且状态一旦从 pending 变出去就定格了，不可能再改，后面再调 resolve 或 reject 都不影响结果。

then 每次都返回一个全新的 Promise，所以能一直链下去。链条的传递规则是：上一个 then 的回调返回什么值，就传给下一个 then；要是返回的是个 Promise，下一个 then 会等它出结果再执行。多个有依赖的异步就这样串成一条线。

错误处理是冒泡式的：链上任何一环抛错或者 reject，会跳过后面的成功回调，一路传到最后的 catch 统一接住。所以业务代码可以一路写成功路径，末尾兜底就行。

## 展开回答

then 的回调是微任务：就算 Promise 已经 resolve 了，回调也要等当前同步代码跑完才执行，这里能和事件循环连起来讲。Generator 是 async/await 之前的方案，yield 加手动 next 一步一步推进，async/await 把这套自动化了，现在业务里基本不手写 Generator，了解概念就够。

## 面试官可能追问

- then 里抛错了，后面的 then 会怎么走？
- catch 之后链还能继续 then 吗？
- async/await 和 Generator 什么关系？
