---
id: yunshu-smart-city-followup-017-homepage-promise-allsettled-promise-all
title: 追问：首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？
aliases: [能具体解释一下首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样吗？, 从设计取舍看，首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [首页数据, Promise.allSettled, Promise.all, 高德地图, 请求封装]
---

# 追问：首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样？

## 核心回答

首页的概览、交通、事件统计和设施数据互不依赖，用 `Promise.all` 可以同时发出，全部成功后一起更新，避免串行等待；代价是其中一个 Promise 拒绝，整组成功代码就不会执行，其他已经成功的数据也不会在这一轮提交。地图的多个城市环境结果可以独立展示，所以使用 `Promise.allSettled`，把成功项保留下来，同时统计失败数量并提醒用户。选择差异来自业务上的失败策略，不是 allSettled 永远更好。当前首页如果希望局部可用，可以让每张卡片独立维护数据和错误，或者改成 allSettled；统一请求层遇到 5xx 还会跳到 500 页，这也需要和页面级降级一起设计。

## 回答要点

- 首页的概览、交通、事件统计和设施数据互不依赖，用 Promise.all 可以同时发出，全部成功后一起更新，避免串行等待；
- 代价是其中一个 Promise 拒绝，整组成功代码就不会执行，其他已经成功的数据也不会在这一轮提交。
- 地图的多个城市环境结果可以独立展示，所以使用 Promise.allSettled，把成功项保留下来，同时统计失败数量并提醒用户。
- 选择差异来自业务上的失败策略，不是 allSettled 永远更好。

## 面试官可能追问

- 关于“首页为什么用 Promise.all，地图为什么用 allSettled？一个请求失败会怎样”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [Dashboard.tsx，第 486～500 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：首页四组数据使用 Promise.all 整体更新。
> - [Map.tsx，第 252～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:252)：地图环境数据使用 allSettled 保留成功项。
> - [request.ts，第 83～107 行](/Users/aaron/personal-hub/apps/project-1/src/utils/request.ts:83)：业务和 HTTP 5xx 的统一跳转处理。
