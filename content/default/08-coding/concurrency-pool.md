---
id: coding-concurrency-pool
title: 如何实现一个带并发上限的 Promise 池？
aliases: [并发池, Promise 并发限制, concurrency limit]
category: coding
difficulty: 进阶
priority: high
projects: []
keywords: [并发池, 限流, Promise, worker]
---

# 如何实现一个带并发上限的 Promise 池？

## 核心回答

我会维护下一个任务下标和正在运行的数量，启动不超过 limit 个 worker；每个 worker 完成后取下一个任务，直到队列耗尽。结果按原始下标保存，这样完成先后不会改变返回顺序。还要决定遇到一个错误是立即停止，还是收集所有结果；如果支持取消，就让 worker 在取新任务前检查 signal。

## 追问：并发上限为什么不能只用 Promise.all？

Promise.all 会一次把所有任务都启动，文件上传、批量请求或浏览器连接数受限时可能造成内存和服务端压力。并发池把同时运行的数量控制在可接受范围，也能在任务完成后持续补位，吞吐和资源占用更平衡。

## 追问：如何验证没有超出上限？

测试任务开始时把 active 加一，结束时减一，并记录最大值，断言它永远不大于 limit。再用延迟可控的任务验证结果顺序、空任务、任务抛错和取消。不要只断言最终数组，因为那看不出中途是否曾经超限。

