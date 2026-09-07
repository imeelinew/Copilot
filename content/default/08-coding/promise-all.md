---
id: coding-promise-all
title: 如何简化实现 Promise.all？
aliases: [手写 Promise.all, Promise.all 实现]
category: coding
difficulty: 进阶
priority: high
projects: []
keywords: [Promise.all, 并发, thenable]
---

# 如何简化实现 Promise.all？

## 核心回答

我会先把输入转成可迭代对象，按原顺序为每一项调用 `Promise.resolve`，把结果写回对应下标；全部完成时 resolve，任意一项 reject 就立刻 reject。空输入要立即得到空数组，还要处理 thenable 和迭代过程抛错。实现时不能按完成顺序 push，否则结果顺序会错。

## 追问：失败后其他任务会停止吗？

标准 Promise.all 只负责尽快把组合 Promise 置为 rejected，不会自动取消已经发出的任务。若任务支持 AbortSignal，业务层可以在首个失败时统一 abort；不支持取消的任务仍可能在后台完成，所以资源清理和副作用要另行处理。

## 追问：allSettled 什么时候更合适？

当我需要知道每一项的结果，不能因为一项失败就丢掉其余数据时，会选 allSettled，比如仪表盘多张卡片并行加载。它返回每项的 status 和 value 或 reason，页面可以逐块展示。关键是不要把业务上必须全部成功的流程误用成部分成功。

