---
id: js-var-let-const
title: var、let、const 有什么区别？
aliases: [变量声明区别, let const var, 暂时性死区, 变量提升]
category: javascript
difficulty: 基础
priority: high
projects: []
keywords: [作用域, 变量提升, 块级作用域, const]
---

# var、let、const 有什么区别？

## 30 秒回答

var 是函数作用域，声明会提升并初始化为 undefined，可以重复声明，全局声明还会挂到 window 上。let 和 const 是块级作用域，存在暂时性死区，声明前访问会报错，也不允许重复声明。const 声明时必须初始化，引用不能再重新赋值，但对象的属性仍然可以修改。我现在的习惯是默认 const，需要重新赋值才用 let，var 基本不再使用。

## 标准回答

可以从三个维度对比。

作用域上，var 只区分函数，在 if 或 for 块里声明的变量会泄漏到外部；let 和 const 引入了块级作用域，变量只在所在代码块内有效。

提升行为上，var 声明会提升并初始化为 undefined，所以在声明前访问不报错但值是 undefined，容易掩盖问题；let 和 const 也会提升，但在执行到声明语句前处于暂时性死区，访问直接抛 ReferenceError，把隐患提前暴露出来。

引用特性上，const 约束的是"绑定不可重新赋值"，对象内容依然可以修改，真正冻结要用 Object.freeze。

一个经典的对照是循环加闭包：用 var 声明循环变量时，三个异步回调打印的都是同一个最终值，因为它们共享同一个函数作用域变量；换成 let 后，每轮循环都会创建一个新的块级绑定，回调各自捕获自己的值。这个例子能同时说明作用域和闭包的关系。

在 TypeScript 项目里我几乎全部用 const，配合类型推断代码更稳定；需要重新赋值的计数器、临时变量才用 let。

## 回答要点

- 按"作用域、提升、引用"三个维度组织，不要想到哪说到哪。
- 主动用循环闭包的例子串联 var 和 let 的差异。
- 提到 const 不等于不可变对象，是加分的严谨点。

## 面试官可能追问

- 什么是暂时性死区？为什么要设计它？
- 循环中 var 加 setTimeout 为什么输出相同的值？
- const 对象怎么做到真正不可变？
