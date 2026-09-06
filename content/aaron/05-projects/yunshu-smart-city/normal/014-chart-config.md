---
id: yunshu-smart-city-normal-014-chart-config
title: 亮点 2：图表配置同时保存展示结果和转换语义
aliases: [请介绍一下项目中的图表配置同时保存展示结果和转换语义。, 你在图表配置同时保存展示结果和转换语义方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 进阶
priority: high
projects: [云枢智慧城市数据平台]
keywords: [数据可视化, ECharts, React]
---

# 亮点 2：图表配置同时保存展示结果和转换语义

## 核心回答

图表如果只保存一份 ECharts option，再次打开时只能看到上次生成的静态数组，不知道它原来来自哪张表、哪个字段和哪种聚合；如果只保存查询字段，又无法稳定还原用户当时的展示配置。当前代码把表名、X/Y 字段、实际查询字段、聚合方式、业务标签和时间粒度作为版本化元数据写入图表配置。编辑时可以读回配置，仪表盘查看时也能按元数据重新查询、转换并生成 option；如果数据查询失败，仍保留旧配置作为显示回退。限制是元数据只支持版本 1 和固定几种转换，迁移、排序和复杂过滤还没有覆盖，而且聚合仍在浏览器完成。我会用相同配置保存后重新打开，修改底层数据再进入看板，检查字段语义、聚合结果和回退状态是否正确。

## 回答要点

- 图表如果只保存一份 ECharts option，再次打开时只能看到上次生成的静态数组，不知道它原来来自哪张表、哪个字段和哪种聚合；
- 如果只保存查询字段，又无法稳定还原用户当时的展示配置。
- 当前代码把表名、X/Y 字段、实际查询字段、聚合方式、业务标签和时间粒度作为版本化元数据写入图表配置。
- 编辑时可以读回配置，仪表盘查看时也能按元数据重新查询、转换并生成 option；

## 面试官可能追问

- 关于“图表配置同时保存展示结果和转换语义”，数据和视图状态是怎样对应的？
- 数据缺失或组件卸载时如何清理资源并保持页面稳定？
- 你会用哪些指标验证这部分的性能和正确性？

## 代码证据

>
> - [chartDataTransform.ts，第 43～74 行](/Users/aaron/personal-hub/apps/project-1/src/utils/chartDataTransform.ts:43)：转换元数据的版本检查、持久化和清理。
> - [ChartEditor.tsx，第 198～211 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:198)：编辑时恢复查询和转换配置。
> - [ChartEditor.tsx，第 266～327 行](/Users/aaron/personal-hub/apps/project-1/src/pages/ChartEditor.tsx:266)：生成转换配置并随图表保存。
> - [Dashboards.tsx，第 165～217 行](/Users/aaron/personal-hub/apps/project-1/src/pages/Dashboards.tsx:165)：看板读取元数据、重新查询并生成实时图表配置。
> - [chartDataTransform.test.ts，第 158～192 行](/Users/aaron/personal-hub/apps/project-1/tests/chartDataTransform.test.ts:158)：代码中已有的元数据读写及“先聚合后限制”相关测试。
