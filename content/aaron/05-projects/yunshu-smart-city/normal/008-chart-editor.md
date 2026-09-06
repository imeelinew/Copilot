---
id: yunshu-smart-city-normal-008-chart-editor
title: 图表创建和编辑
aliases: [请介绍一下项目中的图表创建和编辑。, 你在图表创建和编辑方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [数据可视化, ECharts, React]
---

# 图表创建和编辑

## 核心回答

用户创建图表时会按步骤选择目标仪表盘、数据源、数据表、X 轴、Y 轴、统计方式和图表类型。选中数据表后，前端再请求字段列表；生成预览时，先让数据源查询接口返回相关行，再把城市 ID 转成城市名，把时间统一到天，并根据用户选择做计数、求和、平均值、最大值或最小值，最后交给 ECharts 生成配置。保存时除了查询字段和图表配置，还把这次转换规则写进图表配置的元数据，方便以后重新查询和还原。这样设计让用户用业务字段完成配置，不需要手写 SQL 或 ECharts option。边界是聚合在浏览器执行，数据量大时不适合；当前转换结果最多展示前 50 个分类，而且“前 50”按聚合结果的插入顺序截取，不等于业务上的 Top 50。

## 回答要点

- 用户创建图表时会按步骤选择目标仪表盘、数据源、数据表、X 轴、Y 轴、统计方式和图表类型。
- 选中数据表后，前端再请求字段列表；
- 生成预览时，先让数据源查询接口返回相关行，再把城市 ID 转成城市名，把时间统一到天，并根据用户选择做计数、求和、平均值、最大值或最小值，最后交给 ECharts 生成配置。
- 保存时除了查询字段和图表配置，还把这次转换规则写进图表配置的元数据，方便以后重新查询和还原。

## 面试官可能追问

- 关于“图表创建和编辑”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [ChartEditor.tsx，第 53～109 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:53)：内置数据表说明和字段辅助判断。
> - [ChartEditor.tsx，第 160～228 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:160)：加载字段、仪表盘、数据源、编辑详情和城市字典。
> - [ChartEditor.tsx，第 230～304 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:230)：切换表、查询数据、转换业务字段并生成预览。
> - [ChartEditor.tsx，第 306～335 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:306)：保存查询配置、ECharts 配置和转换元数据。
> - [datasources.ts，第 34～49 行](/Users/aaron/personal-hub/apps/project-1/src/api/datasources.ts:34)：数据源列表、数据表、字段和查询接口。
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的写入、读取和移除。
> - [chartDataTransform.ts，第 101～187 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:101)：字段转换、聚合、无效值统计和 50 项限制。
