---
id: shiguangji-shop-followup-021-skeleton-vant-weapp
title: 追问：Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？
aliases: [能具体解释一下Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么吗？, 从设计取舍看，Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [骨架屏, Vant Weapp, 首页数据, 地址管理, 订单流程, 组件设计]
---

# 追问：Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么？

## 核心回答

`SkeletonList` 不是重新实现一套骨架组件，内部仍然使用 Vant Skeleton。它封装的是多个列表页面都会重复出现的卡片结构，把数量、文本行数、头像大小、形状和间距做成参数。搜索、购物车、订单列表和地址列表只需要传自己的差异，页面再用各自的 loading 控制什么时候显示。

这样做能减少重复模板，并让类似页面的占位风格统一。首页的轮播和商品网格结构不同，所以保留专用骨架，没有为了复用而强行塞进同一个组件。骨架屏提供加载反馈，占位接近真实内容时还能减少页面跳动，但它不会让接口返回更快。是否真的改善布局，需要实际观察加载过程，不能根据“用了骨架屏”就给出性能提升比例。

## 回答要点

- SkeletonList 不是重新实现一套骨架组件，内部仍然使用 Vant Skeleton。
- 它封装的是多个列表页面都会重复出现的卡片结构，把数量、文本行数、头像大小、形状和间距做成参数。
- 搜索、购物车、订单列表和地址列表只需要传自己的差异，页面再用各自的 loading 控制什么时候显示。
- 这样做能减少重复模板，并让类似页面的占位风格统一。

## 面试官可能追问

- 关于“Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么”，你为什么选择当前方案？
- “Vant 已经有 Skeleton，为什么还要封装 SkeletonList？骨架屏提升了什么”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [SkeletonList 第 1～46 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkeletonList.vue:1)：Vant Skeleton、组件参数、默认值和样式变量。
> - [搜索第 33～37 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:33)、[购物车第 32～38 行](/Users/aaron/personal-hub/apps/project-2/src/views/Cart.vue:32)、[订单列表第 15～22 行](/Users/aaron/personal-hub/apps/project-2/src/views/MyOrder.vue:15)、[地址第 19～24 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:19)：四个公共骨架入口。
> - [首页第 10～22、49～106 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:10)：首页专用骨架和内容布局。
> - [首页第 31～38、136～143 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:31)：首张轮播优先级和商品图懒加载；这些是其他资源策略。
