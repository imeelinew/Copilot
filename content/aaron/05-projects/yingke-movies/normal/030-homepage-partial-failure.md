---
id: yingke-movies-normal-030-homepage-partial-failure
title: 首页没有完成单分类失败降级
aliases: [请介绍一下项目中的首页没有完成单分类失败降级。, 你在首页没有完成单分类失败降级方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: normal
projects: [映刻影视]
keywords: [首页数据, 组件设计, Promise.allSettled, Promise.all, 加载状态]
---

# 首页没有完成单分类失败降级

## 核心回答

当前首页使用 `Promise.allSettled`，但没有读取每项结果的 `status`。当其中一个分类请求失败时，该项没有 `value`，组件继续访问 `main.value` 就可能报错，并影响整个首页渲染。可以在父页面把 settlement 结果转换成统一的 `{data, loading, error}` 状态，只把成功数据传给组件，失败分类单独展示错误和重试，其他分类继续显示。面试时我会把它说成“选择了能够保留独立结果的并发方式，但分类级降级仍待补充”，不会说容错已经做完。

## 回答要点

- 当前首页使用 Promise.allSettled，但没有读取每项结果的 status。
- 当其中一个分类请求失败时，该项没有 value，组件继续访问 main.value 就可能报错，并影响整个首页渲染。
- 可以在父页面把 settlement 结果转换成统一的 {data, loading, error} 状态，只把成功数据传给组件，失败分类单独展示错误和重试，其他分类继续显示。
- 面试时我会把它说成“选择了能够保留独立结果的并发方式，但分类级降级仍待补充”，不会说容错已经做完。

## 面试官可能追问

- 关于“首页没有完成单分类失败降级”，你为什么选择当前方案？
- “首页没有完成单分类失败降级”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：直接保存三项 settlement 结果，没有检查 `status`。
> - [components/listContent.vue 第 4～17 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:4>)：组件只支持存在 `value` 的成功结果。
