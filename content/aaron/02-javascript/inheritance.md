---
id: js-inheritance
title: JS 有哪些继承方式？
aliases: [继承, 原型链继承, 组合继承, 寄生组合继承, class继承]
category: javascript
difficulty: 高频
priority: normal
projects: []
keywords: [继承, prototype, class extends, 组合继承, 寄生组合]
---

# JS 有哪些继承方式？

## 核心回答

现在写继承我直接用 class extends，一行搞定，底层走的就是原型链。老式的几种我也都能讲：原型链继承是把子类的 prototype 指向父类的一个实例，缺点很明显，父类里引用类型的属性会被所有子类实例共享，一个实例改了大家全跟着变，而且创建子类实例时没法给父类构造函数传参。

构造函数继承是在子类里写 Parent.call(this)，把父类的实例属性复制过来，解决了共享和传参的问题，但父类原型上的方法完全拿不到。组合继承把两者结合，call 管属性、原型链管方法，能正常用了，代价是父类构造函数被执行了两次，属性被初始化了两份。

最优解是寄生组合继承：用 Object.create(Parent.prototype) 让子类原型只继承父类原型，不执行父类构造函数，把多余的两次调用省掉。class extends 内部做的其实就是这件事。

## 展开回答

判断继承关系用 instanceof，它沿实例的原型链找构造函数的 prototype，所以子类实例 instanceof 父类是 true。ES6 的 class 和老构造函数有行为差异：class 必须 new 调用、内部默认严格模式、方法不可枚举，所以说它是语法糖，但不是完全等价。

class 继承里 super 相当于先执行父类构造函数把 this 建好，子类必须在 super 之后才能用 this。

## 面试官可能追问

- 组合继承为什么会执行两次父类构造函数？
- class 继承里 super 具体做了什么？
- 寄生组合继承的核心代码思路？
