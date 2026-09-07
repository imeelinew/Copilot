---
id: ts-tsconfig-strict
title: tsconfig 里的 strict 对项目有什么影响？
aliases: [TypeScript strict, noImplicitAny, strictNullChecks]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [tsconfig, strict, strictNullChecks, noImplicitAny]
---

# tsconfig 里的 strict 对项目有什么影响？

## 核心回答

`strict` 会打开一组更严格的检查，最常见的体感是不能隐式使用 any、null 和 undefined 不能随便当成普通值。刚打开时会出现不少错误，但这些错误通常是在提醒接口边界和空值分支没有写清楚。

我会先解决真实的类型问题，不会一上来满项目加 `as`。比如一个请求可能返回空数据，就把类型写成 `User | null`，在使用前判断；一个参数来源不可信，就从 unknown 开始收窄。这样 strict 才真正起到约束作用。

## 追问：strictNullChecks 为什么有用？

很多线上错误就是“以为一定存在，实际是 undefined”。开启后，数组查找、可选字段和接口空值都需要明确处理，代码会多几行判断，但错误会更早暴露。

## 追问：noUncheckedIndexedAccess 会带来什么变化？

用下标取数组或对象时，结果会带上 undefined。它逼着我处理越界和不存在的 key，适合数据来源不稳定的项目。对确实已经检查过的场景，可以用 if 收窄，而不是到处写非空断言。

## 追问：什么时候可以用类型断言？

我只在边界已经被其他方式保证、而 TypeScript 无法推断时用断言，比如 DOM 查询后确认元素存在。外部 API、用户输入和权限判断不能只靠断言。
