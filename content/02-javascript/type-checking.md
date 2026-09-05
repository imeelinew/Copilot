---
id: js-type-checking
title: 怎么判断 JS 的数据类型？
aliases: [typeof, instanceof, 类型判断, null和undefined区别]
category: javascript
difficulty: 基础
priority: high
projects: []
keywords: [typeof, instanceof, Object.prototype.toString, Array.isArray]
---

# 怎么判断 JS 的数据类型？

## 核心回答

我按场景选工具。typeof 用来快速分基本类型，返回的是字符串，number、string、boolean、undefined、symbol 都准，但它有两个著名特例：typeof null 返回 'object'，是历史遗留 bug 一直没修；函数返回 'function'，除此之外所有引用类型一律返回 'object'，数组和普通对象分不开。

instanceof 用来判断引用类型的具体类别，比如 arr instanceof Array。原理是沿着原型链找构造函数的 prototype，找得到就是 true。缺点是基本类型判断不了，而且跨 iframe 的数组会判断失灵，因为两边用的不是同一个 Array 构造函数。

最全能的是 Object.prototype.toString.call(x)，返回 '[object Array]'、'[object Null]' 这样的字符串，什么类型都能准确区分。实际写代码判断数组我直接用 Array.isArray，最简洁也没有跨 iframe 的问题。

## 展开回答

顺带 null 和 undefined 的区别：undefined 一般是系统给的默认值，变量声明了没赋值、函数没写返回值，拿到的都是 undefined；null 是程序员主动赋的，表示这里故意没有对象，所以函数找不到该返回的对象时常返回 null。判断 undefined 用 typeof 最安全，就算变量没声明也不报错。

## 面试官可能追问

- typeof null 为什么是 'object'？
- Array.isArray 和 instanceof 用哪个好？
- 为什么有的代码用 void 0 来表示 undefined？
