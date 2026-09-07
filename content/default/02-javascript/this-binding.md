---
id: javascript-this-binding
title: 普通函数、箭头函数和类方法的 this 怎么判断？
aliases: [this 指向, 箭头函数 this, bind call apply]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [this, 箭头函数, bind, call, apply]
---

# 普通函数、箭头函数和类方法的 this 怎么判断？

## 核心回答

普通函数的 this 看调用方式：`obj.fn()` 通常是 obj，直接调用在严格模式下是 undefined，`call/apply/bind` 可以显式指定；用 `new` 调用时 this 是新对象。箭头函数没有自己的 this，它捕获定义位置的外层 this，也不能被 call 或 bind 改掉。类方法本质上仍是普通函数，脱离实例调用时需要手动绑定或用箭头属性。

## 追问：为什么 setTimeout 里的 this 常出问题？

把普通方法直接传给 setTimeout 后，定时器只拿到一个函数引用，调用时没有原来的对象接收者，this 就变了。可以用箭头函数包住调用、提前 bind，或把需要的数据显式传进回调。选哪种取决于是否需要保留动态 this，不能只靠记忆口诀。

## 追问：bind 之后还能被 new 覆盖吗？

绑定函数用 new 调用时，new 的实例优先级高于 bind 绑定的 this，但预设参数仍然保留。实际使用中我会避免同时混用两种语义，手写题则用一个带原型的构造函数例子验证。关键是区分“绑定 this”和“部分应用参数”是两个效果。

