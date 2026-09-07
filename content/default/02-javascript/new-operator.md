---
id: js-new-operator
title: new 一个对象时底层发生了什么？
aliases: [手写 new, new 的实现原理, 构造函数实例化]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [new, prototype, constructor, 实例]
---

# new 一个对象时底层发生了什么？

## 核心回答

可以按四步理解：先创建一个新对象，把它的原型指向构造函数的 prototype；再用这个对象作为 this 执行构造函数；最后如果构造函数返回的是对象，就返回那个对象，否则返回刚创建的实例。这样实例既能拿到构造函数里初始化的属性，也能通过原型共享方法。

所以 `new Person('A')` 不是普通函数调用，this、prototype 和返回值都有特殊规则。手写时最容易漏的是“构造函数显式返回对象”的情况，不能无条件返回自己创建的实例。

## 追问：箭头函数能用 new 吗？

不能。箭头函数没有自己的 this，也没有 prototype，JavaScript 会把它视为不可构造函数。普通函数、class 或者明确实现了构造能力的函数才可以被 new。

## 追问：class 和手写构造函数有什么关系？

class 提供了更清楚的语法，实例方法仍然放在 prototype 上，extends 也建立在原型链上。class 的构造调用必须使用 new，而普通函数既可以直接调用，也可能被当成构造函数，class 在这里更不容易误用。

## 追问：构造函数返回基本类型会怎样？

基本类型会被忽略，仍然返回新建的实例。只有显式返回对象或函数时，才会替换默认实例。这也是手写 new 时需要用 `typeof result === 'object' && result !== null || typeof result === 'function'` 判断的原因。
