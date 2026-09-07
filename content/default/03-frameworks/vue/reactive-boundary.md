---
id: vue-reactive-boundary
title: Vue 3 的响应式是怎么工作的？
aliases: [Proxy 响应式, computed 缓存, Vue 依赖收集]
category: vue
difficulty: 进阶
priority: high
projects: []
keywords: [Proxy, track, trigger, computed, 响应式]
---

# Vue 3 的响应式是怎么工作的？

## 核心回答

Vue 3 用 Proxy 代理对象。读取属性时，如果当前有正在运行的副作用，就把它记录为这个属性的依赖；修改属性时，再把依赖它的副作用安排重新执行。computed 在这个基础上缓存计算结果，依赖没变时不会每次都重新算。

这只是理解模型，真实实现还涉及嵌套对象、数组、Map、Set、调度队列和递归触发。面试里我会先把“读取收集、修改触发、computed 缓存”讲清楚，再说明自己没有把源码每一行都背下来。

## 追问：为什么解构 reactive 会丢响应式？

解构以后拿到的是当时的值，不再经过原代理对象的属性读取。需要保留连接时可以用 toRef 或 toRefs；如果只是拿一次数据做计算，普通解构反而更简单。

## 追问：shallowRef 什么时候有用？

第三方实例、大型不可变对象不需要深层代理时，可以用 shallowRef，只追踪 ref.value 的替换。内部对象自己变化不会触发更新，使用时要明确由谁负责通知。

## 追问：markRaw 会带来什么影响？

它告诉 Vue 不要把某个对象转成响应式，适合地图、图表实例等外部对象。标记后内部变化不会自动驱动模板，清理和手动刷新都要自己负责。
