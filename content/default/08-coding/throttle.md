---
id: coding-throttle-cancel-flush
title: 手写 throttle 时 leading、trailing 和取消怎么定义？
aliases: [手写节流, throttle 实现]
category: coding
difficulty: 进阶
priority: normal
projects: []
keywords: [throttle, 节流, leading, trailing]
---

# 手写 throttle 时 leading、trailing 和取消怎么定义？

## 核心回答

节流的目标是在时间窗口内最多执行一次。实现前先定清楚 leading 是否立即执行、trailing 是否在窗口结束补最后一次，以及 cancel 和 flush 的行为；否则不同实现都可能被叫作 throttle。闭包里保存最近参数、上次执行时间和定时器，执行后清理引用。滚动监听常用节流，但滚动结束还要不要补一次，取决于业务是否需要最终位置。

## 追问：debounce 和 throttle 怎么选？

搜索输入通常希望用户停下来后只请求一次，用 debounce；滚动、拖拽和窗口 resize 需要持续响应但不能每个事件都计算，用 throttle。两者都不能替代请求取消或结果版本校验，选择时还要看操作是否需要最后一次 trailing 调用。

## 追问：怎么测时间边界？

用 fake timer 控制时间，覆盖窗口内多次调用、恰好到边界、cancel、flush、leading=false 和 trailing=false。断言调用次数与最后一次参数，不能只等真实时间后看结果，否则 CI 负载变化会让测试抖动。

