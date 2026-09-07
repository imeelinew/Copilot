---
id: browser-web-worker
title: Web Worker 适合解决什么问题？
aliases: [主线程卡顿, Web Worker, worker 通信]
category: engineering
difficulty: 进阶
priority: normal
projects: []
keywords: [Web Worker, 主线程, postMessage, transferable]
---

# Web Worker 适合解决什么问题？

## 核心回答

Worker 适合把比较重、又不需要直接操作 DOM 的计算移到后台线程，比如大文件解析、复杂数据转换、图像处理。页面通过 postMessage 传数据，Worker 做完再回消息。它不是把所有异步都丢过去，网络请求本身通常不需要 Worker。

通信会有序列化成本。大数组频繁复制也可能抵消收益，适合时可以用 transferable 转移 ArrayBuffer 的所有权。Worker 没有 DOM，不能直接更新页面，最终还是要把结果交回主线程。

## 追问：Worker 怎么取消？

简单场景可以调用 terminate 直接结束，再创建新的 Worker。任务型 Worker 也可以约定取消消息，让它自己停止；如果任务已经在执行，页面还要丢弃迟到的结果，不能只依赖终止时序。

## 追问：SharedWorker 和普通 Worker 有什么区别？

普通 Worker 一般服务一个页面上下文，SharedWorker 可以被同源的多个页面共享，通过端口通信。共享状态更复杂，生命周期和关闭时机也更难管理，只有确实需要跨页面协作时才考虑。

## 追问：什么时候用 requestAnimationFrame 而不是 Worker？

动画和布局最终都要回主线程，Worker 不能直接替代渲染。Worker 适合重计算，requestAnimationFrame 适合把轻量的视觉更新对齐到下一帧，两者解决的问题不一样。
