---
id: yunshu-smart-city-normal-025-homepage-promise-allsettled-promise-all
title: 为什么地图用 Promise.allSettled，首页却用 Promise.all？
aliases: [能具体解释一下为什么地图用 Promise.allSettled，首页却用 Promise.all吗？, 从设计取舍看，为什么地图用 Promise.allSettled，首页却用 Promise.all？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [首页数据, Promise.allSettled, Promise.all, 高德地图]
---

# 为什么地图用 Promise.allSettled，首页却用 Promise.all？

## 核心回答

地图中每个城市的环境数据相互独立，一个失败时其他城市仍有展示价值，所以用 `allSettled` 并显示失败数量。首页四组概览目前被当成一组完整数据，用 `Promise.all` 保证一起更新，但代价是一个失败整组失败。两种写法反映了不同失败策略，不过首页如果想提高可用性，也应该拆成独立状态或改用 `allSettled`，分别展示错误。

## 回答要点

- 地图中每个城市的环境数据相互独立，一个失败时其他城市仍有展示价值，所以用 allSettled 并显示失败数量。
- 首页四组概览目前被当成一组完整数据，用 Promise.all 保证一起更新，但代价是一个失败整组失败。
- 两种写法反映了不同失败策略，不过首页如果想提高可用性，也应该拆成独立状态或改用 allSettled，分别展示错误。

## 面试官可能追问

- 关于“为什么地图用 Promise.allSettled，首页却用 Promise.all”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [Map.tsx，第 252～275 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:252)：环境接口的 allSettled 和失败计数。
> - [Dashboard.tsx，第 486～500 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:486)：首页概览的 Promise.all 整组更新。
