---
id: js-iterator-generator
title: 迭代器、可迭代对象和生成器有什么关系？
aliases: [Iterator Generator, Symbol.iterator, yield]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [迭代器, 生成器, Symbol.iterator, yield]
---

# 迭代器、可迭代对象和生成器有什么关系？

## 核心回答

可迭代对象是能提供 `Symbol.iterator` 方法的对象，调用这个方法会得到迭代器。迭代器每次调用 `next()` 返回 `{ value, done }`，`for...of` 就是按这个协议不断取值，直到 done 为 true。

生成器函数用 `function*` 声明，里面用 yield 暂停和产出值。它调用后返回一个同时满足迭代器和可迭代对象协议的对象，所以可以直接被 for...of 遍历。它适合表达按需产生数据的过程，不需要一开始把所有结果放进数组。

## 追问：生成器和 async/await 是什么关系？

async/await 可以看作把 Promise 异步流程写得更直观，早期也可以用生成器加执行器手动推进 Promise。现在业务代码通常直接用 async/await，生成器仍然适合做可暂停的同步迭代或特定流程控制。

## 追问：for...of 为什么不能直接遍历普通对象？

普通对象默认没有 Symbol.iterator，所以不满足可迭代协议。可以自己实现这个方法，或者用 Object.keys、Object.entries 遍历对象的可枚举属性。两种遍历表达的意图不同，不应该只为了少写几行代码强行转换。

## 追问：生成器能提前结束吗？

可以调用 `return()` 结束迭代，或者在生成器内部 return。for...of 中途 break 时，如果迭代器提供 return 方法，也会给它清理资源的机会。
