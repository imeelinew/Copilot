---
id: vue-ref-vs-reactive
title: ref 和 reactive 有什么区别？
aliases: [ref reactive, .value, 响应式数据, toRefs]
category: vue
difficulty: 高频
priority: high
projects: [轻购]
keywords: [ref, reactive, value, 解构, toRefs]
---

# ref 和 reactive 有什么区别？

## 核心回答

reactive 只能包对象类型，ref 什么都能包。ref 包对象时内部其实就是走 reactive，包原始值时靠一个带 value 属性的对象来劫持，所以在 JS 里读写都得 .value，模板里会自动解包不用写。

实际写代码要注意 reactive 的两个坑：一是对象不能整体替换，replace 之后变量指向的不是原来那个 Proxy，响应式就断了；二是解构或者展开 reactive 对象，解出来的是普通值，响应式同样断，真要解构得用 toRefs。ref 没这些毛病，无非是 .value 写着啰嗦。

所以我的习惯是默认 ref，简单、类型也友好；一组关系紧密、整体用不拆不换的数据，比如一个表单对象，用 reactive 也挺好。

## 展开回答

为什么 ref 对原始值必须包一层：JS 里原始值是按值传递的，本身没法劫持，Vue 只能把它挂在对象的 value 属性上，读写 value 时做依赖收集和触发更新。理解了这一点，.value 就不是怪写法，是实现方式的必然结果。

## 面试官可能追问

- 为什么 ref 在 JS 里要 .value，模板里不用？
- reactive 解构后为什么失去响应式？怎么解决？
- 项目里你怎么在 ref 和 reactive 之间选？
