---
id: datapilot-dashboard-data
title: 仪表盘的并行加载、定时刷新和 CSV 导出是怎么做的？
aliases: [仪表盘实现, 定时刷新, csv导出, 轮询]
category: datapilot
difficulty: 项目
priority: normal
projects: [城市视图]
keywords: [Promise.all, setInterval, CSV, BOM, 轮询]
---

# 仪表盘的并行加载、定时刷新和 CSV 导出是怎么做的？

## 核心回答

并行加载：概览、事件、设施、交通这四组数据互不依赖，串行请求延迟是叠加的，所以用 Promise.all 一起拉。同时每组单独兜底，哪组挂了只有那张卡片显示异常加重试，别的照常。

定时刷新：setInterval 周期重拉，但有几个细节——上一轮请求没回来就跳过本轮，防止请求堆积；组件卸载时把定时器清掉。

CSV 导出：把表头和数据行拼成 CSV，字段里有逗号、引号要按规范转义，然后用 Blob 加 a 标签触发下载。有个我真实踩过的坑：内容前面要加 BOM，不然 Excel 打开中文全是乱码。

## 展开回答

定时刷新还有一条：页面切到后台时定时器还在跑就纯属浪费，我会监听 visibilitychange，隐藏时暂停，回到页面先刷一次再继续轮询。频率上刷新的是展示型数据，几十秒一轮够了，真要实时推送才考虑 WebSocket，不为用而用。

导出这块，数据量大了以后前端这么拼会占内存，那就应该换成后端分页流式导出，这个边界我清楚。导出文件里我会带上生成时间，口径清楚。

## 面试官可能追问

- 页面切到后台，定时器还在跑吗？
- 要导出十万行怎么办？
- 轮询和 WebSocket 怎么选？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Dashboard/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/utils/download.ts
