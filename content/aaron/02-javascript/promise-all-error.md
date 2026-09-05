---
id: js-promise-all-error
title: Promise.all 里一个请求失败了会怎样？
aliases: [promise.all失败, allSettled, 并行请求错误处理, promise并发]
category: javascript
difficulty: 高频
priority: high
projects: [智服工单]
keywords: [Promise.all, allSettled, 降级, 并行请求]
---

# Promise.all 里一个请求失败了会怎样？

## 核心回答

一损俱损。里面任何一个失败，整个 Promise.all 立刻失败，其他已经成功的结果也拿不到。

所以用之前我会先想清楚：这几个并行请求是不是"要么都要、要么都不要"的关系。强关联的就用 all，比如详情页主数据，缺一块就没法渲染，统一走错误处理。互相独立的就用 Promise.allSettled，或者每个请求自己 catch 返回一个兜底值。allSettled 会把每个结果标成 fulfilled 或 rejected，处理起来最明确。

## 展开回答

工单系统的数据看板就是独立数据的情况：统计、七日趋势、问题类型分布三组并行拉，趋势接口挂了就只有趋势那张卡片显示异常加重试，别的照常渲染，没必要整个看板报错。

有个容易忽略的点：all 里一个失败之后，其他请求并不会被取消，只是结果被扔掉了，等于白跑。真想省资源得配合 AbortController 自己取消。请求量特别大的时候还要考虑并发控制，分批发。接口之间有依赖就别硬并行，用 async/await 串起来，或者拿前一个的结果当后一个的参数。

## 面试官可能追问

- all 和 allSettled 具体怎么选？
- 手写 Promise.all 的思路？
- 接口之间有依赖怎么办？
