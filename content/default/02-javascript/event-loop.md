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

## 核心回答

事件循环主要解决的就是：同步代码和异步回调，到底按什么顺序执行。

在浏览器里，JavaScript 主线程一次只能做一件事。比如遇到一个定时器，浏览器会负责计时，主线程继续往下执行，不会停在那里等。时间到了，回调也得先排队，等主线程有空了才能执行。所以就算延迟设成 0，也不会马上执行。

排队的时候，还要区分宏任务和微任务。像定时器的回调是宏任务，Promise 的 then 回调是微任务。当前任务里的同步代码执行完，会先把排队的微任务全部执行完，再处理下一个宏任务。如果执行微任务时又加了新的微任务，也会接着处理。

比如同一段代码里，先写一个 setTimeout，再写一个 Promise.resolve().then，最后直接打印一句话。执行时会先打印最后那句，再执行 then，最后才执行定时器的回调。后面也是每执行完一个宏任务，就把微任务处理完，再继续处理下一个，这样不断重复。
