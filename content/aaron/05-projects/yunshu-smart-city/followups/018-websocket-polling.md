---
id: yunshu-smart-city-followup-018-websocket-polling
title: 为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？
aliases: [能具体解释一下为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办吗？, 从设计取舍看，为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [WebSocket, 定时轮询, 首页数据, SSE, 请求取消]
---

# 为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办？

## 核心回答

首页展示的是概览统计，当前后端提供普通 HTTP 查询，五分钟轮询接入简单，也不需要维护持续连接。这个时间只是当前配置，是否合适要看数据更新频率和业务允许的延迟，所以不能把它叫实时监控。页面卸载时会清除 interval，但已经发出的请求不会因此取消；手动刷新和定时刷新如果重叠，当前也没有在途锁或请求版本，先发出的旧请求后返回时可能覆盖较新的数据。继续完善时，我会在一轮完成后再安排下一轮，或者合并重叠刷新，并用 AbortController 或 requestId 保证只有最新结果能写状态。只有业务要求低延迟推送且服务端支持时，才值得引入 SSE 或 WebSocket。

## 回答要点

- 首页展示的是概览统计，当前后端提供普通 HTTP 查询，五分钟轮询接入简单，也不需要维护持续连接。
- 这个时间只是当前配置，是否合适要看数据更新频率和业务允许的延迟，所以不能把它叫实时监控。
- 页面卸载时会清除 interval，但已经发出的请求不会因此取消；
- 手动刷新和定时刷新如果重叠，当前也没有在途锁或请求版本，先发出的旧请求后返回时可能覆盖较新的数据。

## 面试官可能追问

- 关于“为什么 5 分钟轮询，不用 WebSocket？手动刷新和定时刷新撞上怎么办”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

>
> - [Dashboard.tsx，第 503～530 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:503)：事件请求和手动刷新直接写入状态。
> - [Dashboard.tsx，第 534～554 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboard.tsx:534)：首屏请求、五分钟 interval 和卸载清理。
