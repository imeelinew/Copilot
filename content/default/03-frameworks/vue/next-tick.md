---
id: vue-next-tick
title: Vue 的 nextTick 解决什么问题？
aliases: [Vue DOM 更新时机, nextTick 使用场景]
category: vue
difficulty: 进阶
priority: normal
projects: []
keywords: [nextTick, DOM 更新, 响应式]
---

# Vue 的 nextTick 解决什么问题？

## 核心回答

修改响应式状态后，Vue 通常会把 DOM 更新合并到异步更新队列里。`nextTick` 用来等这次更新完成，再读取已经变化的 DOM。比如切换一个面板后，需要把焦点放到新出现的输入框，就可以在状态修改后 await nextTick。

它只保证 Vue 的 DOM 更新完成，不保证图片、字体或第三方地图已经加载，也不能修复状态设计本身的问题。读取布局前还要确认元素确实渲染出来了。

## 追问：什么时候不该用 nextTick？

只是计算数据、更新另一个响应式变量时不需要它。滥用 nextTick 会让代码依赖具体刷新时序，难以理解。能通过 computed、watch 或模板自然完成的事情，不要加一层等待。

## 追问：nextTick 和 setTimeout 有什么区别？

nextTick 针对 Vue 自己的更新队列，时机更明确；setTimeout 只是把代码推到后面的宏任务，不能保证你想等的 DOM 更新已经完成。要等浏览器下一帧做视觉测量时，才考虑 requestAnimationFrame。

## 追问：watch 里要不要再 nextTick？

默认 watch 回调的时机不一定是 DOM 更新之后。如果确实需要读取更新后的 DOM，可以给 watch 设置 flush: 'post'，或在回调里使用 nextTick。先说明自己需要的是数据变化还是 DOM 变化，再选方式。
