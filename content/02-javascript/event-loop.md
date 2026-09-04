---
id: js-event-loop
title: JavaScript 事件循环是怎样执行的？
aliases: [event loop, 事件循环, 宏任务和微任务, js执行顺序]
category: javascript
difficulty: 高频
priority: high
projects: []
keywords: [调用栈, 宏任务, 微任务, Promise, setTimeout]
---

# JavaScript 事件循环是怎样执行的？

## 30 秒回答

JavaScript 主线程先执行同步代码，调用栈清空后会先清空微任务队列，再进入下一个宏任务。Promise 的 then、queueMicrotask 属于微任务，setTimeout、用户事件等属于宏任务。因此一次宏任务结束后产生的所有微任务，一般会在下一个宏任务之前执行。

## 标准回答

浏览器中的 JavaScript 是单线程执行的。同步代码会依次进入调用栈执行，异步操作交给浏览器提供的能力处理，完成后把对应回调放入任务队列。

当当前调用栈清空后，事件循环会先执行微任务队列，并且一直执行到微任务队列为空，然后浏览器才有机会进行渲染，再选择下一个宏任务执行。常见微任务包括 Promise.then、catch、finally 和 queueMicrotask；常见宏任务包括 script、setTimeout、setInterval、网络事件和用户交互事件。

所以判断输出顺序时，我会先执行整段同步代码，再按产生顺序清空微任务，最后进入 setTimeout 等后续宏任务。同时还要注意，微任务执行过程中产生的新微任务也会在这一轮继续被清空。

## 回答要点

- 同步代码不是任务队列之前的“另一套系统”，初始 script 本身也是一个任务。
- 一轮任务结束后清空微任务，再进入下一任务。
- 不要简单背成“微任务永远比宏任务快”。

## 面试官可能追问

- async/await 后面的代码属于什么任务？
- 微任务不断产生会发生什么？
- Node.js 和浏览器的事件循环完全一样吗？
