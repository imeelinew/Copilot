---
id: vue-reactive-principle
title: Vue 的响应式原理是什么？
aliases: [响应式原理, 数据劫持, 依赖收集, 数据驱动视图]
category: vue
difficulty: 必问
priority: high
projects: [智服工单, 轻购]
keywords: [defineProperty, Proxy, 依赖收集, watcher, track, trigger]
---

# Vue 的响应式原理是什么？

## 核心回答

Vue2 和 Vue3 的思路是一样的：把数据变成可监听的，谁用了这个数据就记下来，数据一变就通知谁去更新视图。区别在监听的手段。

Vue2 用 Object.defineProperty 把 data 里已有的属性一个个转成 getter 和 setter。组件渲染时读到某个属性就触发 get，把渲染 watcher 收进这个属性的依赖里；属性被修改触发 set，就通知这些 watcher 重新渲染。因为 defineProperty 只能劫持初始化时就存在的属性，所以后续新增属性、删除属性、直接改数组下标它都监听不到，得靠 $set 这类 API 补。

Vue3 换成 Proxy，代理的是整个对象，新增、删除、数组索引都能拦到。读到属性就 track 收集依赖，赋值就 trigger 派发更新。嵌套对象不是初始化就递归代理，而是访问到的时候才包一层 Proxy，比 Vue2 一上来全部递归劫持要省。

## 展开回答

Vue2 还有个细节：数组的七个变更方法是重写的，push、splice 这些先调原生再手动派发更新，所以 push 能触发视图，但 arr[0] = 1 不行。

数据变了也不是马上改 DOM，而是先进一个异步队列，同一个事件循环里批量去重执行，这也是为什么改完数据立刻读 DOM 拿到的是旧值，要等 nextTick。

## 面试官可能追问

- 为什么 Vue3 放弃 defineProperty 改用 Proxy？
- Proxy 有什么兼容性代价？
- 改完数据为什么拿不到最新的 DOM？nextTick 是怎么实现的？
