---
id: yingke-movies-followup-008-page-unload
title: 如果页面离开时请求还没有结束，怎么处理？
aliases: [能具体解释一下如果页面离开时请求还没有结束，怎么处理吗？, 从设计取舍看，如果页面离开时请求还没有结束，怎么处理？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [uni.request, 请求适配器, uni-app]
---

# 如果页面离开时请求还没有结束，怎么处理？

## 核心回答

当前代码没有请求取消机制，请求发出后也没有保存 `uni.request` 返回的 task，所以页面离开时不能主动终止请求。小项目里可能暂时看不出问题，但在慢网或频繁切页时，已离开的页面仍可能收到结果并继续更新状态。如果继续完善，我会让 adapter 支持取消信号，页面卸载时取消不再需要的请求；至少也要增加页面是否仍然有效的判断，避免无意义更新。这个属于改进方案，不是当前已经实现的功能。

## 回答要点

- 当前代码没有请求取消机制，请求发出后也没有保存 uni.request 返回的 task，所以页面离开时不能主动终止请求。
- 小项目里可能暂时看不出问题，但在慢网或频繁切页时，已离开的页面仍可能收到结果并继续更新状态。
- 如果继续完善，我会让 adapter 支持取消信号，页面卸载时取消不再需要的请求；
- 至少也要增加页面是否仍然有效的判断，避免无意义更新。

## 面试官可能追问

- 关于“如果页面离开时请求还没有结束，怎么处理”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [utils/request.js 第 4～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:4>)：调用 `uni.request` 后没有保存 request task，也没有取消逻辑。
> - [pages/detail/index.vue 第 25～31 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/detail/index.vue:25>)：详情请求返回后直接更新页面状态。
