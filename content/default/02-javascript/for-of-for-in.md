---
id: js-for-of-for-in
title: for...of 和 for...in 有什么区别？
aliases: [for of, for in, 遍历对象, 可迭代对象]
category: javascript
difficulty: 基础
priority: normal
projects: []
keywords: [for of, for in, Symbol.iterator, 可枚举, 遍历]
---

# for...of 和 for...in 有什么区别？

## 核心回答

for...in 遍历的是 key，拿的是对象的可枚举属性名，而且是字符串形式，还会把原型链上可枚举的属性一起遍出来。for...of 遍历的是 value，但只能用在可迭代对象上，数组、字符串、Map、Set、NodeList 都行；普通对象不行，因为它没实现 Symbol.iterator，直接 for...of 会报错。

数组我从来不用 for...in：key 是字符串、继承属性也会被遍到，全是坑。数组场景用 for...of 或 forEach；for...in 留给遍历普通对象，而且最好配合 Object.keys 或 hasOwnProperty，只处理自己的属性，别把原型上的也带进来。

## 展开回答

for...of 比 forEach 好的一点是流程可控，能 break、continue，回调里也能正常 return，配合 await 串行处理也是它方便。想让自定义对象支持 for...of，给它定义 Symbol.iterator 方法就行，本质是返回一个带 next 的迭代器。

再往深一点说，for...in 会遍历可枚举属性，所以类上挂在 prototype 的方法不会被遍到（方法默认不可枚举），但手动 Object.assign 加上去的就会，这也是建议先过滤再用的原因。

## 面试官可能追问

- 普通对象为什么不能 for...of？
- 怎么只遍历对象自身的属性？
- Symbol.iterator 是什么？
