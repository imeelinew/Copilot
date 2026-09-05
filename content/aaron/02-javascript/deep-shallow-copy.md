---
id: js-deep-shallow-copy
title: 深拷贝和浅拷贝的区别？
aliases: [深拷贝, 浅拷贝, 深克隆, 浅克隆, structuredClone]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [深拷贝, 浅拷贝, 引用, structuredClone, 循环引用]
---

# 深拷贝和浅拷贝的区别？

## 核心回答

浅拷贝只复制对象的第一层。第一层如果是基本类型的值，拷过去就是独立的；但属性里要是嵌了对象或数组，复制到的只是引用，两边还是指向同一块内存，改一个另一个跟着变。常见的浅拷贝有 Object.assign 和展开运算符，数组还有 slice、concat。

深拷贝是把嵌套的对象也重新创建一份，拷完两边完全独立。最省事的写法是 JSON.parse(JSON.stringify())，但它坑不少：undefined、函数、Symbol 会直接丢掉，Date 会变成字符串，正则变成空对象，遇到循环引用直接报错，所以只适合纯数据的简单对象。

现在浏览器有原生的 structuredClone，循环引用、Date、Map、Set 都能拷，我一般优先用它。要更细的控制就自己写递归，用 WeakMap 记录已经拷过的对象，碰到循环引用直接取缓存，不会死循环。

## 展开回答

实际项目里深浅拷贝的坑大多是改状态引起的：想改一个嵌套对象又怕动到原数据，结果只展开了一层，里面的数组还是共享的，一改把原来那份也改了。所以动手拷之前要先想清楚数据有几层、哪部分需要独立。

手写递归深拷贝的核心思路：基本类型直接返回；是对象就新建一个，逐个 key 递归拷下去；日期、正则这些按类型单独处理；用 WeakMap 缓存已拷贝对象来解决循环引用。

## 面试官可能追问

- JSON.stringify 做深拷贝有哪些具体的坑？
- structuredClone 有什么限制？
- 手写深拷贝怎么处理循环引用？
