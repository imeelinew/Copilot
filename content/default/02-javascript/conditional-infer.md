---
id: typescript-conditional-infer
title: infer 和条件类型应该解决什么问题？
aliases: [TypeScript infer, 条件类型, 类型体操]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [TypeScript, infer, 条件类型, 映射类型]
---

# infer 和条件类型应该解决什么问题？

## 核心回答

条件类型像类型层面的 if，`infer` 可以在匹配某种结构时把其中一部分类型“取出来”，例如提取 Promise 的结果或函数返回值。它适合写通用库和 API 辅助类型，让调用者少写重复类型；业务代码里如果类型已经清楚，就不要为了炫技堆很多嵌套条件，编译错误反而更难读。类型体操要以可维护和编译速度为边界。

## 追问：分布式条件类型是什么？

当条件类型左侧是裸类型参数时，联合类型会逐成员分发，所以 `T extends U ? A : B` 作用在 `A | B` 上可能得到多个结果。把参数包在元组里可以关闭分发。遇到结果不符合预期，我会先把中间类型写出来，再判断是不是分发导致，而不是马上加一堆断言。

## 追问：类型体操能校验运行时数据吗？

不能。TypeScript 类型在编译后会被擦除，接口返回的 JSON 仍然可能缺字段或类型错误。边界处应先以 unknown 接收，再用 schema 或 type guard 做运行时校验，校验通过后才进入领域逻辑。

