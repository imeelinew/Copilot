---
id: coding-lru-cache
title: LRU 缓存怎么实现和验证？
aliases: [手写 LRU, 最近最少使用缓存]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [LRU, 缓存, Map, 淘汰]
---

# LRU 缓存怎么实现和验证？

## 核心回答

JavaScript 的 Map 保持插入顺序，所以可以用 Map 做一个简单 LRU：get 命中后先删除再 set，让它变成最新；set 已有键也先删除；超过容量时删除 `map.keys().next().value`。容量要限制为正整数，未命中返回约定的空值。缓存还要另外考虑过期时间、读写并发和缓存穿透，LRU 只解决容量淘汰。

## 追问：为什么不直接用对象？

对象不适合表达任意键的插入顺序，也容易遇到原型键和属性语义问题。Map 的 `has`、`get`、`delete` 和顺序都是明确的，代码更短。若要支持持久化或跨进程共享，则需要换成专门的缓存系统，不能把内存 LRU 当成分布式缓存。

## 追问：如何测试淘汰顺序？

先放入 A、B、C，读取 A，再写入 D，断言 B 被淘汰而 A、C 仍在。还要测覆盖同一键不会增加数量、容量为一、空缓存和过期后重新加载。性能测试可以观察大量 get/set 是否保持近似 O(1)。

