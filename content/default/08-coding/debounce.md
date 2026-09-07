---
id: coding-debounce-cancel-flush
title: 手写一个支持取消和 flush 的 debounce
aliases: [手写防抖, debounce 实现]
category: coding
difficulty: 进阶
priority: high
projects: []
keywords: [debounce, 防抖, cancel, flush]
---

# 手写一个支持取消和 flush 的 debounce

## 核心回答

我会返回一个包装函数，并把 timer、最近一次参数和上下文关在闭包里。每次调用先清掉旧 timer，再按 wait 重新计时；到点时用最后一次参数执行。`cancel` 清 timer 并丢弃参数，`flush` 如果还有待执行调用就立即执行并清理。若要支持 leading、trailing，最好把选项和边界写清楚，再用 fake timer 验证第一次调用、连续调用和取消。

## 追问：为什么要保存 this 和参数？

因为真正执行发生在稍后的定时器回调里，回调自己的 this 和参数已经不是调用包装函数时的那一份。保存并在执行时用 `apply` 还原，才能让它既适用于普通函数，也适用于方法调用。执行完要清空引用，避免长时间持有大对象。

## 追问：搜索框里为什么还要取消请求？

防抖只能减少请求次数，不能保证已经发出的旧请求先结束。搜索输入变化时还要 AbortController 或请求序号保护，防止旧结果覆盖新结果。两者解决的是不同问题，通常一起使用。

