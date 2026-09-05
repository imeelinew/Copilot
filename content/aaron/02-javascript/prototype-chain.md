---
id: js-prototype-chain
title: 原型链是什么？
aliases: [原型, __proto__, prototype, 原型对象]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [prototype, __proto__, constructor, 原型链, instanceof]
---

# 原型链是什么？

## 核心回答

每个对象内部都有一个指向另一个对象的引用，平时叫 __proto__，标准叫法是 [[Prototype]]，它指向自己的原型对象。函数比较特殊，额外有一个 prototype 属性，用 new 创建实例的时候，实例的内部指向就被设成构造函数的 prototype。读属性的时候，对象自己没有就顺着这个指向往上一层层找，找到 Object.prototype 还没有就返回 undefined，这条查找链就是原型链。

原型存在的意义说白了是共享：把公共方法挂在 prototype 上，多少个实例用的都是同一个函数，不用每个实例存一份，省内存。另外 prototype 上天生有个 constructor 指回构造函数，所以能从实例反查它是谁 new 出来的。

比如数组能直接用 push、map，实例自己身上根本没有这些方法，都是在 Array.prototype 上找到的。

## 展开回答

三者关系要能现场画出来：构造函数的 prototype 是原型对象，原型对象的 constructor 指回构造函数，实例的内部指向指向原型对象。instanceof 的原理就是沿着实例这条链找构造函数的 prototype，找得到就返回 true。

链条的终点是 null：普通对象的内部指向是 Object.prototype，而 Object.prototype 的内部指向是 null，到这查找就结束。__proto__ 这个访问器是历史遗留，正式代码里取原型用 Object.getPrototypeOf，设原型用 Object.create 或 Object.setPrototypeOf。

## 面试官可能追问

- prototype 和 __proto__ 分别挂在谁身上？
- instanceof 是怎么实现的？
- new 一个对象的过程中发生了什么？
