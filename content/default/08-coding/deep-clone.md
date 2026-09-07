---
id: coding-deep-clone
title: 深拷贝题怎样说明能力边界？
aliases: [手写深拷贝, structuredClone, 循环引用]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [深拷贝, 循环引用, structuredClone]
---

# 深拷贝题怎样说明能力边界？

## 核心回答

先问清楚数据范围：如果是普通 JSON 数据，我会直接使用 `structuredClone` 或明确的递归实现；不要默认 `JSON.parse(JSON.stringify())`，因为它会丢 undefined、函数、特殊对象，还会在循环引用时失败。递归版本要用 WeakMap 记录已经复制的对象，处理数组、Date、Map、Set 等类型，并说明函数、DOM 节点和自定义类实例是否支持。

## 追问：为什么需要 WeakMap？

它既能记录原对象到副本的映射，避免循环递归，又不会因为缓存这次拷贝而永久阻止原对象垃圾回收。遇到已经见过的对象直接返回对应副本，还能保留同一引用在副本中的共享关系，而不是复制成两个不同对象。

## 追问：什么时候不该深拷贝？

深拷贝会复制整个对象图，成本可能很高，而且常常掩盖了状态边界设计问题。只改一小段状态时，我会做结构共享的浅复制；传输数据时让接口返回不可变快照；需要跨线程传输时再根据结构选择 structured clone 或 Transferable。

