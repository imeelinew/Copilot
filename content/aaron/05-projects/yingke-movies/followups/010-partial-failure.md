---
id: yingke-movies-followup-010-partial-failure
title: 如果三个分类中的一个请求失败，另外两个还能显示吗？
aliases: [能具体解释一下如果三个分类中的一个请求失败，另外两个还能显示吗吗？, 从设计取舍看，如果三个分类中的一个请求失败，另外两个还能显示吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, Promise.allSettled, Promise.all]
---

# 如果三个分类中的一个请求失败，另外两个还能显示吗？

## 核心回答

从 `Promise.allSettled` 的机制看，另外两个成功结果会保留下来；但按当前组件写法，失败项没有 `value`，组件仍然直接访问 `main.value.subject_collection`，所以页面可能在渲染失败分类时出错。也就是说，底层结果没有丢，但前端还没有真正做到让成功分类继续显示。完善时应该先在首页判断每项 `status`，成功时传业务数据，失败时传错误状态并提供单独重试。

## 回答要点

- 从 Promise.allSettled 的机制看，另外两个成功结果会保留下来；
- 但按当前组件写法，失败项没有 value，组件仍然直接访问 main.value.subject_collection，所以页面可能在渲染失败分类时出错。
- 也就是说，底层结果没有丢，但前端还没有真正做到让成功分类继续显示。
- 完善时应该先在首页判断每项 status，成功时传业务数据，失败时传错误状态并提供单独重试。

## 面试官可能追问

- 关于“如果三个分类中的一个请求失败，另外两个还能显示吗”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：页面保存完整 settlement 对象，没有判断成功或失败。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件直接读取成功结果中的 `main.value`。
