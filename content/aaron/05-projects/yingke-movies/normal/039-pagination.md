---
id: yingke-movies-normal-039-pagination
title: 异步请求和分页
aliases: [请介绍一下项目中的异步请求和分页。, 你在异步请求和分页方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 进阶
priority: high
projects: [映刻影视]
keywords: [分页, 首页数据, 验证方法, 请求取消]
---

# 异步请求和分页

## 核心回答

我会在开发工具里模拟慢网、超时和单接口失败：首页重点验证一个分类失败时另外两个是否还能显示；列表重点验证快速连续触底、最后一页不足 8 条、进入详情再返回以及前后请求返回顺序变化。Network 中要核对 `start` 是否按 0、8、16 递增，并用影片 ID 检查列表是否重复。当前代码没有请求锁、取消请求或结果序号，因此这些验证很可能暴露边界，但没有实际执行就不能说故障已经发生。

## 回答要点

- 我会在开发工具里模拟慢网、超时和单接口失败：首页重点验证一个分类失败时另外两个是否还能显示；
- 列表重点验证快速连续触底、最后一页不足 8 条、进入详情再返回以及前后请求返回顺序变化。
- Network 中要核对 start 是否按 0、8、16 递增，并用影片 ID 检查列表是否重复。
- 当前代码没有请求锁、取消请求或结果序号，因此这些验证很可能暴露边界，但没有实际执行就不能说故障已经发生。

## 面试官可能追问

- 关于“异步请求和分页”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 36～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:36>)：首页并发结果处理位置。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：分页数据追加位置。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：生命周期重入和触底请求位置。
