---
id: js-es6-features
title: ES6+ 有哪些常用新特性？
aliases: [es6新特性, es2015, js新语法, 箭头函数区别]
category: javascript
difficulty: 高频
priority: high
projects: [轻购]
keywords: [解构, 展开运算符, async await, 可选链, Map]
---

# ES6+ 有哪些常用新特性？

## 核心回答

说天天在用的吧。语法层面，let/const、箭头函数、模板字符串、解构、展开运算符、默认参数这些已经是肌肉记忆了。异步这块是 Promise 和 async/await，平时写异步流程基本都是 async/await 加 try/catch。数据结构有 Map 和 Set。再新一点的有可选链和空值合并，读嵌套数据特别好用，比如 `config?.theme ?? 'light'`，一行顶以前好几层 if。

解构和展开运算符是用得最多的两个：接口数据解构直接取字段；改数组里某一项时，map 一个新数组、展开运算符替换那一项，不直接改原数据。

## 展开回答

"不改原数据"这件事在 React 里是硬要求，状态必须不可变更新，在 Vue 里我也保持这个习惯，逻辑更可预测。Map 我在搜索联想的缓存里用过，比普通对象强的地方是键不限类型、有插入顺序，我利用插入顺序做了个简单的容量淘汰。

箭头函数除了短，还有词法 this，回调里不用再 bind，这个和普通函数的区别基本必被追问。模块层面 ESM 也值得提，打包工具靠静态的 import 依赖图做 tree shaking，用不到的导出能直接摇掉，产物小不少。

## 面试官可能追问

- 箭头函数和普通函数的区别？
- async/await 和 Promise 是什么关系？
- Map 和普通对象有什么区别？
