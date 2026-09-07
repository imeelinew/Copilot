---
id: datapilot-chart-editor-validation
title: 城市视图图表编辑器怎样保证配置和预览一致？
aliases: [城市视图图表配置, ChartEditor, 图表预览]
category: datapilot
difficulty: 进阶
priority: high
projects: [城市视图]
keywords: [ECharts, datasource, xField, yField, aggregation]
---

# 城市视图图表编辑器怎样保证配置和预览一致？

## 核心回答

编辑器把 datasource、table、xField、yField 和 aggregation 作为一份配置，字段级联时先清空下游选择，再重新加载可选字段。保存和预览前都要做同一套 schema 校验，避免表单看起来合法、接口却拒绝。预览请求拿到数据后，再根据 bar、line、pie、scatter 的约定转换成 ECharts option；空数据和字段缺失要有明确提示，而不是画一张误导性的空图。

## 追问：快速切换字段如何防旧请求覆盖？

每次级联请求都记录当前选择或请求序号，响应回来时只接受仍然匹配的那一轮；也可以用 AbortController 取消上一轮。加载状态按字段层级管理，不能让旧请求结束时把新一轮的 loading 提前关掉。测试要故意让旧请求后完成，才能证明保护真的有效。

## 追问：前端校验为什么还不够？

浏览器里的配置和权限都可以被修改，服务端必须再次校验数据源权限、字段白名单、聚合方式和查询范围。否则用户可能读取不该看的表，或者提交一个让数据库超时的查询。前端校验负责及时反馈，后端校验负责真实边界，两边应共享可检查的契约。

