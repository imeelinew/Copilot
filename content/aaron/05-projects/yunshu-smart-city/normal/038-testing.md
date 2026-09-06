---
id: yunshu-smart-city-normal-038-testing
title: 自动化测试覆盖仍集中在纯函数
aliases: [请介绍一下项目中的自动化测试覆盖仍集中在纯函数。, 你在自动化测试覆盖仍集中在纯函数方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [自动化测试, 请求封装, 登录鉴权, 首页数据, 组件设计, 验证方法]
---

# 自动化测试覆盖仍集中在纯函数

## 核心回答

代码里有 Token 工具、地图数据转换和图表转换的单元测试，一共能看到 22 个 `test()` 声明，但没有看到登录到首页、401 刷新重放、真实 SSE 分块、地图 SDK 生命周期和主要管理页面的组件或端到端测试。重构请求层、升级第三方 SDK 或修改交互时，这些集成边界主要依赖人工验证，回归风险会更高。改进时我会保留纯函数单测，再增加请求 mock 下的组件测试和 Playwright 主流程测试；地图和 AI 用可控适配层模拟失败、乱序和分块。面试时只能说“代码中存在这些测试”，本次没有执行，不能说它们已经通过。

## 回答要点

- 代码里有 Token 工具、地图数据转换和图表转换的单元测试，一共能看到 22 个 test() 声明，但没有看到登录到首页、401 刷新重放、真实 SSE 分块、地图 SDK 生命周期和主要管理页面的组件或端到端测试。
- 重构请求层、升级第三方 SDK 或修改交互时，这些集成边界主要依赖人工验证，回归风险会更高。
- 改进时我会保留纯函数单测，再增加请求 mock 下的组件测试和 Playwright 主流程测试；
- 地图和 AI 用可控适配层模拟失败、乱序和分块。

## 面试官可能追问

- 关于“自动化测试覆盖仍集中在纯函数”，你为什么选择当前方案？
- “自动化测试覆盖仍集中在纯函数”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [package.json，第 6～11 行](/Users/aaron/personal-hub/apps/project-1/package.json:6)：测试脚本只运行 `tests/*.test.ts`。
> - [authSession.test.ts，第 20～96 行](/Users/aaron/personal-hub/apps/project-1/tests/authSession.test.ts:20)：8 个 Token 解析、调度和 single flight 测试。
> - [mapData.test.ts，第 11～76 行](/Users/aaron/personal-hub/apps/project-1/tests/mapData.test.ts:11)：5 个地图数据转换和 AQI 边界测试。
> - [chartDataTransform.test.ts，第 11～192 行](/Users/aaron/personal-hub/apps/project-1/tests/chartDataTransform.test.ts:11)：9 个字段转换、聚合、限制和元数据测试。
