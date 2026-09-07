---
id: javascript-structured-clone
title: structuredClone 能复制什么，不能复制什么？
aliases: [结构化克隆, 深拷贝边界, structuredClone]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [structuredClone, 深拷贝, Transferable]
---

# structuredClone 能复制什么，不能复制什么？

## 核心回答

structuredClone 按结构化克隆算法复制很多内建类型，例如对象、数组、Date、Map、Set、Blob 和部分 TypedArray，也能处理循环引用；传 Transferable 时还可以把 ArrayBuffer 的所有权转移。函数、DOM 节点、WeakMap、带不可克隆字段的对象不能直接复制，原型和类实例语义也不能简单等同于“完整复制”。所以使用前先确认数据契约，不要把它当成万能深拷贝。

## 追问：和 JSON 深拷贝相比好在哪里？

它不会把 undefined、NaN、Date 或循环引用粗暴变成字符串、null 或直接报错，类型覆盖更明确，也可以跨 worker 传结构化数据。代价是仍然要遍历整个对象图，而且函数、资源句柄等仍不能复制。只改一小块状态时，结构共享的浅复制通常更省。

## 追问：Transferable 为什么会让原数据失效？

转移的是底层资源所有权，不是再复制一份，所以发送后原 ArrayBuffer 会进入 detached 状态，不能继续读写。它适合大块二进制跨线程传递，减少复制成本；使用前要确保发送方确实不再需要这段内存。

