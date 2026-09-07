---
id: javascript-instanceof-prototype
title: instanceof 怎样沿原型链判断？
aliases: [手写 instanceof, 原型链, Object.create]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [instanceof, prototype, 原型链, Object.create]
---

# instanceof 怎样沿原型链判断？

## 核心回答

`value instanceof Ctor` 会从 value 的内部原型开始，逐级比较是否等于 `Ctor.prototype`，直到原型为 null。它判断的是原型链关系，不是对象“来自哪个文件”或 JSON 里写了什么。一个简化实现就是先处理 null 和非函数，再循环 `Object.getPrototypeOf`。跨 iframe、Symbol.hasInstance 和修改 prototype 时要说明结果可能和直觉不同。

## 追问：Object.create 和 class extends 是什么关系？

`Object.create(proto)` 直接创建一个以 proto 为原型的对象；构造函数的 `new` 也会把实例原型连到 `Ctor.prototype`，再执行构造函数；`class extends` 会建立子类构造函数和原型对象之间的两条继承链。它们都依赖原型查找，但 class 还带有方法、super 和严格模式等语义。

## 追问：为什么数组跨 iframe 的 instanceof 可能失败？

不同 iframe 有不同的全局对象和 Array 构造函数，数组的原型链指向另一个窗口的 Array.prototype，所以当前窗口的 `instanceof Array` 可能是 false。需要判断内建类型时可以用 `Array.isArray` 或 `Object.prototype.toString`，跨 realm 代码要尽量使用这些不依赖构造函数身份的 API。

