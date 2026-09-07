---
id: coding-event-emitter
title: 手写 EventEmitter 时要处理哪些边界？
aliases: [手写发布订阅, EventEmitter]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [EventEmitter, 发布订阅, once, unsubscribe]
---

# 手写 EventEmitter 时要处理哪些边界？

## 核心回答

我会用 `Map<event, Set<listener>>` 保存监听器，`on` 添加，`off` 删除，`emit` 复制当前集合后逐个调用，避免回调里取消订阅影响本轮遍历。`once` 可以包一层函数，执行后自动移除。还要明确监听器抛错是继续通知其他监听器，还是交给统一 error 事件处理，不能让这个选择隐含在实现里。

## 追问：为什么 emit 时要复制集合？

如果直接遍历原 Set，某个监听器在执行中删除自己或新增监听器，当前轮次的行为会变得难预测。先复制可以固定本轮快照，新增监听器下次才生效，删除也不会跳过其他已经排队的监听器。复制带来一点成本，但事件数量通常值得这个可预测性。

## 追问：怎么避免内存泄漏？

组件卸载或订阅者不再需要时必须调用返回的取消函数，空集合及时从 Map 删除。全局 emitter 不应长期保存短生命周期对象的闭包；如果确实需要弱引用，要先确认运行环境和语义是否值得复杂化。测试里可以检查 off 后不再收到事件。

