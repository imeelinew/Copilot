---
id: engineering-class-vs-function
title: class 和 function 定义的构造函数有什么区别？
aliases: [class本质, es6 class, class区别, 原型语法糖]
category: engineering
difficulty: 基础
priority: normal
projects: []
keywords: [class, 构造函数, 原型, new]
---

# class 和 function 定义的构造函数有什么区别？

## 核心回答

class 本质还是原型和构造函数那一套，说是语法糖可以，但行为上有硬区别，不止是糖。最实用的一个：class 必须 new 调用，直接当函数调会直接报错；普通函数当构造器用，忘了写 new，this 会指向全局（严格模式下是 undefined），属性全挂错地方还不报错，这种 bug 很难查。

class 里定义的方法挂在 prototype 上，而且是不可枚举的，for...in 扫不出来；function 构造器手动挂到原型上的方法是可枚举的。另外 class 内部默认严格模式，class 声明也不像 function 声明那样整体提升，定义之前访问会报错。

## 展开回答

继承上 class 的 extends 和 super 语义清晰，连静态属性都能继承，比手动改 prototype 加 call 那套稳得多。还有 new.target，能在函数里判断自己是不是被 new 调用的，有些库就用它限制调用方式，不用 new 直接抛错提醒。

## 面试官可能追问

- class 的方法存在实例上还是原型上？
- 箭头函数能当构造函数用吗？
- class 有变量提升吗？
