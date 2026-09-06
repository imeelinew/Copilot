---
id: yingke-movies-followup-034-responsive-units
title: 追问：为什么同时使用 `rpx` 和 `px`？
aliases: [能具体解释一下为什么同时使用 `rpx` 和 `px`吗？, 从设计取舍看，为什么同时使用 `rpx` 和 `px`？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 基础
priority: normal
projects: [映刻影视]
keywords: [移动端适配, 组件设计, 验证方法]
---

# 追问：为什么同时使用 `rpx` 和 `px`？

## 核心回答

`rpx` 会根据小程序屏幕宽度换算，比较适合卡片尺寸、字号和间距这类响应式布局；`px` 更适合细边框，或者第三方组件本身以像素接收的参数。混用本身不一定错误，但需要有统一规则，并在不同尺寸设备上验证。当前代码既有 `rpx` 尺寸，也有 `1px`、`2px` 边框和组件间距，所以不能只看源码就认定所有屏幕表现一致。

## 回答要点

- rpx 会根据小程序屏幕宽度换算，比较适合卡片尺寸、字号和间距这类响应式布局；
- px 更适合细边框，或者第三方组件本身以像素接收的参数。
- 混用本身不一定错误，但需要有统一规则，并在不同尺寸设备上验证。
- 当前代码既有 rpx 尺寸，也有 1px、2px 边框和组件间距，所以不能只看源码就认定所有屏幕表现一致。

## 面试官可能追问

- 关于“为什么同时使用 `rpx` 和 `px`”，你为什么选择当前方案？
- “为什么同时使用 `rpx` 和 `px`”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [pages/list/index.vue 第 106～177 行](</Users/aaron/CodingPractice/14_uniapp/project2/pages/list/index.vue:106>)：列表布局大量使用 `rpx`，边框使用 `px`。
> - [components/listContent.vue 第 76～99 行](</Users/aaron/CodingPractice/14_uniapp/project2/components/listContent.vue:76>)：首页卡片尺寸、字号和间距使用 `rpx`。
