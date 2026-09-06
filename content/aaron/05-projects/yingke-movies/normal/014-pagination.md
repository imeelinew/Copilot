---
id: yingke-movies-normal-014-pagination
title: 分页状态会受到页面重入和连续触底影响
aliases: [请介绍一下项目中的分页状态会受到页面重入和连续触底影响。, 你在分页状态会受到页面重入和连续触底影响方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [分页, 影视详情, 验证方法, onShow, 加载状态, 自动化测试]
---

# 分页状态会受到页面重入和连续触底影响

## 核心回答

列表分页不只是把 `start` 加 8。一个具体场景是用户先加载两页，再进入详情页，随后返回列表；`onShow` 会再次执行初始化，而已有列表和游标没有重置，这时同一页数据可能再次被 `concat` 进去。另一个场景是用户快速连续触底，前一个请求还没返回，后一个请求又开始了；当前没有 `isLoading` 请求锁，可能出现重复请求或返回顺序不稳定。代码已经实现了基础偏移分页和总数判断，但没有完整处理生命周期重入、并发触底和 loading 收口。验证时可以记录每个请求的 `start` 和返回影片 ID，连续触底并从详情返回，检查请求参数和列表数据是否重复；本次没有运行项目，所以不能说这些场景已经测试通过。

## 回答要点

- 列表分页不只是把 start 加 8。
- 一个具体场景是用户先加载两页，再进入详情页，随后返回列表；
- onShow 会再次执行初始化，而已有列表和游标没有重置，这时同一页数据可能再次被 concat 进去。
- 另一个场景是用户快速连续触底，前一个请求还没返回，后一个请求又开始了；

## 面试官可能追问

- 关于“分页状态会受到页面重入和连续触底影响”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/list/index.vue 第 38～48 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:38>)：现有分页状态中没有请求锁或已初始化标记。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：请求返回后直接使用 `concat` 追加。
> - [pages/list/index.vue 第 81～102 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:81>)：`onShow` 重入、触底递增和未等待请求的 loading 逻辑。
