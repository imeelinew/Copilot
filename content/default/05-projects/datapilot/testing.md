---
id: datapilot-testing
title: 城市视图的权限、图表和流式功能怎么测试？
aliases: [城市视图测试, AI 流式测试, 地图测试]
category: datapilot
difficulty: 进阶
priority: normal
projects: [城市视图]
keywords: [权限矩阵, ResizeObserver, ECharts, SSE, WebGL]
---

# 城市视图的权限、图表和流式功能怎么测试？

## 核心回答

权限用角色 × 页面 × 操作的矩阵测菜单过滤、路由拦截、未知路径和 401；图表用假数据测空值、排序、截断、字段缺失和 ResizeObserver 清理；地图和 WebGL 则 mock 外部实例，重点测初始化失败、部分接口失败和卸载。AI 流式测试要控制 chunk 边界，覆盖残留 buffer、错误 JSON、fallback、done、断网和取消，不依赖真实模型的随机输出。

## 追问：怎么测图表而不依赖真实 ECharts？

把数据转换和 option 生成抽成纯函数，直接测输入输出；组件层 mock `init`、`setOption`、`resize` 和 `dispose`，断言只在合适时机调用。真实浏览器再保留一两个冒烟用例检查容器尺寸和主题，避免把所有测试都绑在 canvas 实现细节上。

## 追问：如何测试流式分片？

准备同一条事件被拆成两次、一个 chunk 含多条事件、末尾有残留和服务端发 error 的样例，逐次 resolve reader。断言每种事件只产生一次可见结果，连接结束后状态正确；再测用户点击取消后 reader 停止、按钮恢复和半截文本保存。

