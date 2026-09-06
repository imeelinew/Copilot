---
id: yunshu-smart-city-normal-041-mobile-layout-container-layout
title: 移动端和容器布局
aliases: [请介绍一下项目中的移动端和容器布局。, 你在移动端和容器布局方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 基础
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [移动端适配, 验证方法, 自动化测试, 高德地图]
---

# 移动端和容器布局

## 核心回答

移动端验证不能只拖一下浏览器宽度。我会至少覆盖 375、768 和桌面宽度，检查侧栏、表格横向滚动、仪表盘卡片换行、地图工具栏、地图高度、AI 输入区和弹窗；再测试横竖屏切换、长城市名、长 AI 文本和系统字体放大。地图还要在容器尺寸变化后确认中心和覆盖物位置正常，因为它通过 `ResizeObserver` 主动调用 `map.resize()`。当前代码有 Ant Design 响应式列和地图媒体查询，但这次没有打开浏览器验证，不能说移动端已经通过测试。

## 回答要点

- 移动端验证不能只拖一下浏览器宽度。
- 我会至少覆盖 375、768 和桌面宽度，检查侧栏、表格横向滚动、仪表盘卡片换行、地图工具栏、地图高度、AI 输入区和弹窗；
- 再测试横竖屏切换、长城市名、长 AI 文本和系统字体放大。
- 地图还要在容器尺寸变化后确认中心和覆盖物位置正常，因为它通过 ResizeObserver 主动调用 map.resize()。

## 面试官可能追问

- 关于“移动端和容器布局”，你为什么选择当前方案？
- “移动端和容器布局”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [Dashboard.tsx，第 576～602 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:576)：首页指标卡使用 xs、sm、md、lg、xl 响应式列。
> - [Map.tsx，第 295～310 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Map.tsx:295)：地图容器尺寸变化时调用 resize。
> - [Map.css，第 160～179 行](/Users/aaron/personal-hub/apps/project-1/src/css/Map.css:160)：768 像素以下的地图工具栏和高度规则。
