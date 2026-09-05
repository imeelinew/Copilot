---
id: js-call-bind-apply
title: call、apply、bind 有什么区别？
aliases: [call apply bind, 改变this, 手写bind]
category: javascript
difficulty: 高频
priority: normal
projects: []
keywords: [call, apply, bind, this, 借用方法]
---

# call、apply、bind 有什么区别？

## 核心回答

三个都是改 this 指向的。call 和 apply 会立即执行函数，bind 不执行，返回一个 this 被固定好的新函数，什么时候调什么时候执行。call 和 apply 之间区别只在传参格式：call 从第二个参数开始一个个传，apply 只收两个参数，第二个是参数数组。bind 的传参方式跟 call 一样。

使用上，要立即调用就用 call 或 apply，手头参数本来就是数组就用 apply；需要先把 this 固定住、之后再当回调用，比如事件监听、setTimeout，就用 bind。经典场景是借用方法，比如用 Array.prototype.slice.call(arguments) 把类数组转成真数组。

## 展开回答

bind 返回的函数 this 是锁死的，再怎么 call 也改不回来；但如果用 new 调它，new 的优先级更高，this 还是新实例。现在实际开发里直接用的场景少了很多：类数组转数组用 Array.from 或扩展运算符，继承用 class extends。但这三个的手写实现还是常被问，核心思路就是把函数临时挂到目标对象上调用一遍，拿到参数和 this 再删掉。

## 面试官可能追问

- 手写一个 bind 的思路？
- 连续 bind 两次，this 以哪次为准？
- call 传 null 或 undefined 会发生什么？
