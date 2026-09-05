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

## 核心回答

var 是函数作用域，声明会提升，声明之前访问不报错，值是 undefined。let 和 const 是块级作用域，其实也会提升，但声明之前访问直接报 ReferenceError，从声明到代码块开头这段就是暂时性死区。const 和 let 的区别是 const 赋值之后不能再指向别的值，但如果是对象，里面的属性照样能改，它锁的是引用不是内容。

写代码的习惯我现在是默认 const，确实要重新赋值才用 let，var 基本不写了。

## 展开回答

能同时体现三者差异的经典例子是循环加 setTimeout：用 var 声明循环变量，三个回调打印出来全是 3，因为三个闭包共享的是同一个函数作用域变量；换成 let，每轮循环都是一个新绑定，各自打印各自的。这道题经常从 var/let 一路追到闭包，得能连起来讲。

另外 const 冻结不住对象内容，真要不可变得用 Object.freeze，而且它也是浅冻结，嵌套对象照样能改。

## 面试官可能追问

- 暂时性死区为什么要这么设计？
- 循环里 var 加 setTimeout 为什么输出一样的值？
- Object.freeze 是深冻结吗？
