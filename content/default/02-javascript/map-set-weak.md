---
id: javascript-map-set-weak-collections
title: Map、Set、WeakMap 和 WeakSet 怎么选？
aliases: [Map Set WeakMap, 弱引用集合, 集合类型选型]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [Map, Set, WeakMap, WeakSet, 垃圾回收]
---

# Map、Set、WeakMap 和 WeakSet 怎么选？

## 核心回答

需要任意类型键和值、明确遍历顺序时用 Map；只需要去重或判断存在性时用 Set。WeakMap 和 WeakSet 只接受对象键或值，不可枚举，适合给对象附加元数据且不希望集合本身阻止垃圾回收，比如缓存 DOM 节点的信息。它们不是“自动释放所有缓存”的万能方案，仍要控制引用关系和业务生命周期。

## 追问：WeakMap 为什么不能遍历？

如果能枚举，就可能通过观察键是否仍存在推断垃圾回收时机，破坏实现的不可观察性。WeakMap 只提供按已知对象查询、写入和删除的能力。需要展示所有缓存条目或按时间淘汰时，应使用 Map 加明确清理策略。

## 追问：用对象去重有什么坑？

对象键会被转成字符串，`[object Object]` 等键容易冲突，也无法直接区分对象身份。Set 对原始值按 SameValueZero 判断，对象按引用身份判断；如果要按某个字段去重，先明确字段缺失、大小写和排序规则，再用 Map 保存代表项。

