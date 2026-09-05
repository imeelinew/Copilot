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

## 30 秒回答

并行加载：城市概览、事件统计、公共设施、交通排行四组数据互相独立，用 Promise.all 一次拿齐，减少串行等待，单个失败只降级对应卡片。定时刷新：setInterval 周期重拉，组件卸载清理，页面隐藏时暂停避免无效请求。CSV 导出：把当前表格数据序列化成 CSV，拼接时处理转义，生成 Blob 触发下载，内容前加 BOM 头，否则 Excel 打开中文乱码——这是我踩过的坑。

## 标准回答

加载策略上，四组数据没有相互依赖，串行请求会把延迟叠加起来，所以用 Promise.all 并行；同时每个请求单独兜底，失败的那组展示错误态和重试按钮，不拖垮整个仪表盘——独立数据独立降级，这个取舍和 allSettled 的思想一致。

定时刷新的细节比"设个 interval"多：刷新发起时如果上一轮还没回来，要防止请求叠加，我用"请求进行中就跳过本轮"的标记；页面切到后台时定时器继续跑纯属浪费，所以监听 visibilitychange，隐藏时暂停、恢复可见时立即刷一次再继续轮询；组件卸载时清理 interval。频率上刷新的是展示型数据，几十秒一轮足够，不需要 WebSocket 那种实时性。

CSV 导出的实现：把表格的表头和数据行逐行拼接，字段里有逗号、引号、换行要按 CSV 规范转义（包裹双引号、内部引号翻倍）；用 Blob 生成文件、a 标签加 download 属性触发下载。BOM 是踩坑点：CSV 默认编码下 Excel 用本地编码打开，中文会乱码，在内容前加 UTF-8 BOM（\uFEFF）就能正确识别。

要说明的是，导出的是用户当前看到的数据，我会在导出文件里带上生成时间，口径清晰；数据量大了以后，前端导出会占内存，那时应该换成后端分页流式导出。

## 回答要点

- 三件事分开讲，每件都带一个"为什么"。
- 独立数据独立降级、后台暂停轮询是成熟度细节。
- BOM 乱码是真实踩坑，主动讲出来可信度高。

## 面试官可能追问

- 页面切到后台，你的定时器还在跑吗？
- 要导出十万行数据怎么办？
- 轮询和 WebSocket 怎么选？

## 代码证据

- /Users/eli/Dev/datapilot-rebuild/src/pages/Dashboard/index.tsx
- /Users/eli/Dev/datapilot-rebuild/src/utils/download.ts
