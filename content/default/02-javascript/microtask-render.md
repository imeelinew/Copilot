---
id: javascript-microtask-render
title: 微任务、宏任务和浏览器渲染机会怎么排？
aliases: [事件循环, 微任务宏任务, 浏览器渲染时机]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [event loop, 微任务, 宏任务, 渲染]
---

# 微任务、宏任务和浏览器渲染机会怎么排？

## 核心回答

脚本或一个宏任务执行完后，浏览器通常会清空当前微任务队列，再决定是否进入渲染，随后取下一个宏任务；Promise.then 和 queueMicrotask 属于微任务，setTimeout、用户事件和网络回调属于宏任务。具体渲染时机由浏览器调度，不应把它背成绝对顺序。微任务里不断排新微任务可能饿死渲染，所以长计算要拆分或交给 worker。

## 追问：MutationObserver 在哪一类？

它的回调也在微任务检查阶段触发，通常会在当前脚本改完 DOM 后、浏览器下一次渲染前执行。大量同步 DOM 修改会合并通知，但回调里继续改 DOM 也可能形成循环。使用时要断开观察器，避免组件卸载后仍然持有节点。

## 追问：为什么 await 后的代码常常先于 setTimeout？

await 后续相当于把 continuation 放进 Promise 微任务队列；当前宏任务结束后会先清微任务，再处理计时器宏任务，所以通常先执行 await 后的代码。若微任务里有重计算，用户仍可能感觉页面卡住，因为渲染机会被推迟了。

