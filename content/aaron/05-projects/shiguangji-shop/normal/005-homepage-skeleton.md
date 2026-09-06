---
id: shiguangji-shop-normal-005-homepage-skeleton
title: 首页数据加载和骨架屏
aliases: [请介绍一下项目中的首页数据加载和骨架屏。, 你在首页数据加载和骨架屏方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [首页数据, 骨架屏, 地址管理, 订单流程, Promise.allSettled, Promise.all]
---

# 首页数据加载和骨架屏

## 核心回答

首页进入时需要加载轮播图、公告和推荐商品，这三组数据互相不依赖，所以我让它们同时发请求，而不是一个接口结束后再请求下一个。这里使用 `Promise.allSettled` 等待三组请求各自完成，然后分别检查请求有没有成功、接口的 `success` 是否正确、返回的数据结构是不是数组。

这样做主要是为了隔离失败。例如公告接口失败了，轮播图和推荐商品仍然可以正常展示，页面只提示公告加载失败；如果直接把三组请求放进普通的 `Promise.all`，其中一个 Promise 拒绝后，统一处理就拿不到完整的三组结果。需要注意的是，当前页面仍然会等三组请求都结束后再统一更新，并不是哪组先回来就马上展示哪组。

等待数据期间，首页使用符合轮播图和商品网格结构的专用骨架屏。搜索、购物车、订单列表和地址列表的布局比较接近，我又封装了公共的 `SkeletonList`，通过数量、文本行数和头像大小来调整。骨架屏的作用是让用户知道页面正在加载，并尽量减少内容突然出现带来的跳动；它不会让接口本身变快。

## 回答要点

- 首页进入时需要加载轮播图、公告和推荐商品，这三组数据互相不依赖，所以我让它们同时发请求，而不是一个接口结束后再请求下一个。
- 这里使用 Promise.allSettled 等待三组请求各自完成，然后分别检查请求有没有成功、接口的 success 是否正确、返回的数据结构是不是数组。
- 这样做主要是为了隔离失败。
- 例如公告接口失败了，轮播图和推荐商品仍然可以正常展示，页面只提示公告加载失败；

## 面试官可能追问

- 关于“首页数据加载和骨架屏”，你为什么选择当前方案？
- “首页数据加载和骨架屏”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)：三组请求并行结算、业务状态和数据结构检查。
> - [首页第 5～8 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:5)：失败区域提示和重试入口。
> - [首页第 10～22、49～106 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:10)：首页专用骨架和内容切换。
> - [首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)：实际调用加载器、分别赋值和结束 loading。
> - [SkeletonList 第 17～46 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkeletonList.vue:17)：公共列表骨架的参数和样式变量。
> - [搜索第 33～37 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:33)、[购物车第 32～38 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:32)、[订单列表第 15～22 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:15)、[地址第 19～24 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:19)：公共骨架的实际使用位置。
