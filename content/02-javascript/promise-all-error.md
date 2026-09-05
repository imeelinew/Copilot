---
id: js-promise-all-error
title: Promise.all 里一个请求失败了会怎样？
aliases: [promise.all失败, allSettled, 并行请求错误处理, promise并发]
category: javascript
difficulty: 高频
priority: high
projects: [智服工单, 城市视图]
keywords: [Promise.all, allSettled, 降级, 并行请求]
---

# Promise.all 里一个请求失败了会怎样？

## 30 秒回答

Promise.all 是"一损俱损"：任何一个 promise reject，整个 all 立刻 reject，其他已经成功的结果也拿不到。所以并行的请求能不能容忍部分失败，决定了我用什么：强关联的数据用 all，一起成功或一起报错；互相独立的看板卡片就各自兜底失败，或者用 Promise.allSettled 拿到每个结果再分别处理。智服工单和城市视图的看板我都是按这个思路处理的。

## 标准回答

先说机制。Promise.all 接收一组 promise，全部成功时按传入顺序返回结果数组；只要有一个 reject，整个 Promise 立即以第一个失败的原因 reject。要注意两点：其他请求并不会被取消，只是它们的结果被丢弃了；失败返回的不是部分成功，而是单一错误。

智服工单的数据看板会并行拉取工单统计、七日趋势和问题类型分布。这三组数据互相独立，如果趋势接口挂了就把整个看板置为错误页，体验很差。所以我的做法是给每个请求单独 catch，失败时返回兜底结构（空数据和错误标记），对应卡片展示降级提示，其余卡片正常渲染；用 allSettled 也可以，它会把每个结果标成 fulfilled 或 rejected，处理上更明确。

如果是强关联场景，比如详情页的主数据和它的权限校验，缺一个就无法渲染，那就用 Promise.all，统一进错误处理跳转或提示重试。

另外并行不等于无限制并发：请求太多时分批发起，页面离开时用 AbortController 取消未完成的请求，这两个我会在请求量大时考虑。

## 回答要点

- 先答机制"一损俱损"，再讲怎么选 all 还是 allSettled。
- 用看板的真实取舍说明"独立数据独立降级"。
- 提到失败请求不会被自动取消，体现理解深度。

## 面试官可能追问

- all 和 allSettled 具体怎么选？
- 手写一个 Promise.all 的思路？
- 接口之间有依赖关系怎么办？
- Promise.race 和 any 用过吗？
