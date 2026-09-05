---
id: vue-computed-vs-watch
title: computed 和 watch 有什么区别？
aliases: [计算属性, computed缓存, watch deep, immediate]
category: vue
difficulty: 高频
priority: high
projects: [智服工单, 轻购]
keywords: [computed, watch, 缓存, deep, immediate]
---

# computed 和 watch 有什么区别？

## 核心回答

computed 是算值，watch 是做事情。computed 根据已有数据算一个新值，有缓存：依赖没变，取多少次都不会重算，模板里多处使用也只算一次，所以适合放模板里要展示的派生数据。watch 是盯着某个数据，变了就执行回调，适合做副作用：发请求、存 localStorage、操作 DOM 这些。

还有一条硬区别：computed 里不能写异步逻辑，它要的是同步算出一个返回值；要异步就得用 watch。

## 展开回答

watch 监听对象时，Vue2 默认监听不到内部属性变化，要加 deep: true。deep 会递归遍历整个对象，对象大的时候挺费性能，我的做法是尽量监听具体字段，或者写成函数返回值的形式。想让回调在绑定时就先执行一次，加 immediate: true。

Vue3 里规则变了点：watch 一个 reactive 对象默认就是深层的，监听 ref 包的对象才要手动开 deep，或者用 () => obj.key 这种 getter 只盯一个字段。

## 面试官可能追问

- computed 的缓存是怎么实现的？
- computed 和 methods 写在模板里有什么区别？
- deep watch 有什么性能问题？怎么避免？
