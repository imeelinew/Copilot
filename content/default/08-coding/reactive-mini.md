---
id: coding-mini-reactivity
title: 如何手写一个最小响应式系统？
aliases: [手写响应式, reactive 最小实现]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [响应式, Proxy, effect, computed]
---

# 如何手写一个最小响应式系统？

## 核心回答

最小版本需要三件事：读取时记录当前 effect，写入时找到依赖并重新执行，依赖关系用 `target -> key -> effects` 保存。用 Proxy 可以拦截对象属性访问；effect 执行前要清理旧依赖，避免条件分支变化后还触发过时的 key。computed 还要增加脏标记和缓存，watch 则是在值变化后异步或同步调用回调。

## 追问：这个实现最容易漏什么？

会漏掉嵌套对象、数组 length、删除属性、effect 递归触发和停止订阅。还要防止 effect 自己修改依赖造成无限循环，并决定调度器怎样合并重复更新。面试里我会先实现单层对象，再主动说清楚这些边界，不把几十行 demo 说成完整框架。

## 追问：如何验证它真的工作？

先断言读取属性后修改会重新执行，修改未读取的属性不会执行；再测条件分支切换、嵌套对象和停止 effect。用计数器而不是 console.log 做断言，测试会更稳定，也能看出是否重复触发。

