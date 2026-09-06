---
id: yingke-movies-normal-028-stale-response
title: 为什么没有处理请求乱序？
aliases: [能具体解释一下为什么没有处理请求乱序吗？, 从设计取舍看，为什么没有处理请求乱序？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [请求乱序, 首页数据, 商品搜索, 分页]
---

# 为什么没有处理请求乱序？

## 核心回答

当前项目没有搜索联想或频繁切换条件后覆盖同一份数据的场景，首页三个结果也分别写入不同状态，所以代码里没有专门的乱序控制。不过列表快速触底可能同时存在多个请求，如果后发请求先返回，数据追加顺序就可能不稳定。完善时可以使用请求锁避免并发分页；如果业务确实允许并发，则要给请求加序号、取消旧请求或只接受最新一次结果。

## 回答要点

- 当前项目没有搜索联想或频繁切换条件后覆盖同一份数据的场景，首页三个结果也分别写入不同状态，所以代码里没有专门的乱序控制。
- 不过列表快速触底可能同时存在多个请求，如果后发请求先返回，数据追加顺序就可能不稳定。
- 完善时可以使用请求锁避免并发分页；
- 如果业务确实允许并发，则要给请求加序号、取消旧请求或只接受最新一次结果。

## 面试官可能追问

- 关于“为什么没有处理请求乱序”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [pages/home/index.vue 第 42～47 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/home/index.vue:42>)：三个首页结果分别写入不同状态。
> - [pages/list/index.vue 第 64～74 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:64>)：分页结果按返回时间直接追加，没有序号或取消逻辑。
> - [pages/list/index.vue 第 88～95 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:88>)：触底请求没有并发锁。
