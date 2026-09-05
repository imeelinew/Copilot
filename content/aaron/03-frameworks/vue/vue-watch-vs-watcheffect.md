---
id: vue-watch-vs-watcheffect
title: watch 和 watchEffect 有什么区别？
aliases: [watchEffect, 副作用函数, 监听器区别]
category: vue
difficulty: 高频
priority: high
projects: [轻购]
keywords: [watch, watchEffect, 立即执行, 依赖收集]
---

# watch 和 watchEffect 有什么区别？

## 核心回答

watch 要显式声明监听谁，回调里能拿到新旧两个值，默认是惰性的，数据变了才执行。watchEffect 不声明监听谁，回调里用到哪个响应式数据，哪个就是依赖，而且创建时立即执行一遍来收集依赖，之后依赖一变就重跑。

取舍很清楚：需要旧值、或者只想盯特定数据变化，用 watch，意图明确；一段逻辑同时依赖好几个数据、且创建时本来就要跑一次初始化，用 watchEffect 省掉 immediate 加一串监听源。代价是 watchEffect 的依赖是隐式的，读代码的人不容易看出它到底在监听什么，而且拿不到旧值。

## 展开回答

两个都返回停止函数，不过组件卸载时会自动停，不用手动管。执行时机默认在组件更新之前，回调里要读更新后的 DOM 就配 flush: 'post'。另外 watch 监听 reactive 对象默认深层，只想盯某个字段要写成 () => obj.key 这种 getter 形式。

## 面试官可能追问

- watchEffect 拿不到旧值，需要旧值怎么办？
- 怎么手动停止一个 watchEffect？
- watch 监听 reactive 对象的某个属性要注意什么？
