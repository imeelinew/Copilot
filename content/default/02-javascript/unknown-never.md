---
id: ts-unknown-any-never
title: unknown、any 和 never 应该怎么选？
aliases: [TypeScript unknown any never, 类型安全边界]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [unknown, any, never, 类型收窄]
---

# unknown、any 和 never 应该怎么选？

## 核心回答

外部数据我会先用 `unknown` 接住，因为在确认类型以前不能直接访问它的属性。经过 typeof、in 或自定义类型守卫收窄后，才把它当成具体类型。`any` 是把检查关掉，偶尔用于类型不完整的旧库，但不应该从接口层一路传进业务代码。

`never` 表示不可能出现的值。它常用在一个函数永远抛错或一个可辨识联合已经被穷尽的分支里。`void` 则只是表示调用方不关心返回值，两者不是一回事。

## 追问：怎么写一个类型守卫？

让函数返回 `value is User`，在函数里检查对象非空、字段存在以及字段类型。这样调用方通过 if 以后，TypeScript 会把 value 收窄成 User。检查函数不能只返回“看起来像”，否则运行时仍可能被坏数据击穿。

## 追问：为什么接口响应不能直接断言成类型？

`as User` 只是在编译器面前改变说法，不会在运行时检查服务端真的返回了什么。接口字段缺失、类型改变或者网关返回错误 JSON 时，断言仍然会通过。对关键接口，我会用手写守卫或 zod 之类的运行时校验。

## 追问：never 在 switch 里怎么用？

对联合类型的每个成员处理完以后，把剩余值传给 `assertNever(value: never)`。以后有人新增一个联合成员却忘了补分支，编译器会在这里报错，能避免状态悄悄落到默认分支。
