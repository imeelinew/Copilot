---
id: yunshu-smart-city-followup-020-chart-config-echarts
title: 追问：为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？
aliases: [能具体解释一下为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗吗？, 从设计取舍看，为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [ECharts, 数据可视化, React]
---

# 追问：为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗？

## 核心回答

查询配置说明数据来自哪张表、哪些字段；ECharts option 说明图表怎样展示，也包含生成预览时的数据快照。项目还把聚合方式、业务标签、实际查询字段和转换版本作为自定义元数据写进 option，编辑时可以回填，仪表盘打开时也可以按同样规则重新查询和生成。只存 option 会丢失重新计算的语义，只存查询字段又可能丢掉展示和聚合口径。刷新后结果不一定相同：底层数据可能变化，查询失败时仪表盘还可能回退到旧 option，而且图表列表预览走的是另一条查询路径。后续应标出数据时间和回退状态，并统一各入口的转换规则。

## 回答要点

- 查询配置说明数据来自哪张表、哪些字段；
- ECharts option 说明图表怎样展示，也包含生成预览时的数据快照。
- 项目还把聚合方式、业务标签、实际查询字段和转换版本作为自定义元数据写进 option，编辑时可以回填，仪表盘打开时也可以按同样规则重新查询和生成。
- 只存 option 会丢失重新计算的语义，只存查询字段又可能丢掉展示和聚合口径。

## 面试官可能追问

- 关于“为什么既保存查询配置又保存 ECharts option？保存后刷新，结果一定相同吗”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [ChartEditor.tsx，第 314～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:314)：同时保存查询配置、图表配置和转换元数据。
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的写入、读取和剥离。
> - [Dashboards.tsx，第 181～217 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:181)：按元数据重新查询并生成实时 option。
> - [Dashboards.tsx，第 399～411 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:399)：实时 option 不可用时回退到已保存配置。
> - [Chart.tsx，第 133～145 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Chart.tsx:133)：图表列表预览使用图表查询接口。
