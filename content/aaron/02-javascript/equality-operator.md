---
id: js-equality-operator
title: == 和 === 的区别？
aliases: [相等运算符, 严格相等, 隐式类型转换, 宽松相等]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [==, ===, 隐式类型转换, ToPrimitive]
---

# == 和 === 的区别？

## 核心回答

=== 是严格相等，两边类型不一样直接就是 false，不做任何转换。== 是宽松相等，类型不一样会先做隐式转换再比。比如 '1' == 1 是 true，'1' === 1 就是 false。

有几个特殊的要记牢：null == undefined 是 true，它俩要靠 === 才能区分开；NaN 跟任何值比较都是 false，包括它自己；对象之间比较比的是引用地址，两个内容完全一样的数组或对象也不相等。

实际写代码我默认全用 ===，== 的转换规则太绕，容易埋 bug。唯一的例外是判断空值时写 xxx == null，能同时覆盖 null 和 undefined，这个写法是大家认可的。

## 展开回答

== 的转换规则大概是这样：字符串和数字比，字符串转成数字；有布尔值先转成数字；跟对象比，对象先走 ToPrimitive 转成原始值再比。所以会出现 [] == false 是 true、[] == ![] 也是 true 这种反直觉的结果，这也是规范建议一律用 === 的原因。

如果需要更精确的相等判断，可以用 Object.is：它认为 NaN 等于 NaN，这和 === 不一样，用来补 === 的洞。

## 面试官可能追问

- null == undefined 为什么是 true？
- [] == ![] 的结果和原因？
- Object.is 和 === 的区别？
