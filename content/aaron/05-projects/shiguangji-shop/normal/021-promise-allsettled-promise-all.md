---
id: shiguangji-shop-normal-021-promise-allsettled-promise-all
title: 为什么使用 Promise.allSettled，而不是 Promise.all？
aliases: [能具体解释一下为什么使用 Promise.allSettled，而不是 Promise.all吗？, 从设计取舍看，为什么使用 Promise.allSettled，而不是 Promise.all？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [Promise.allSettled, Promise.all, 首页数据, 加载状态]
---

# 为什么使用 Promise.allSettled，而不是 Promise.all？

## 核心回答

因为首页三组数据互相独立，我希望某一组失败时其他成功内容仍然能展示。`Promise.all` 中任意 Promise 拒绝后会直接进入失败分支；`allSettled` 会给出每一项各自的完成状态，我可以逐项判断。它的代价是当前仍会等待三项全部结束，如果想让最快的数据先显示，需要把每一区域的 loading 和更新也拆开。

## 回答要点

- 因为首页三组数据互相独立，我希望某一组失败时其他成功内容仍然能展示。
- Promise.all 中任意 Promise 拒绝后会直接进入失败分支；
- allSettled 会给出每一项各自的完成状态，我可以逐项判断。
- 它的代价是当前仍会等待三项全部结束，如果想让最快的数据先显示，需要把每一区域的 loading 和更新也拆开。

## 面试官可能追问

- 关于“为什么使用 Promise.allSettled，而不是 Promise.all”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

[homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)、[首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)。
