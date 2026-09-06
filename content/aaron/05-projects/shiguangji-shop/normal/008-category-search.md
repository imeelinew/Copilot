---
id: shiguangji-shop-normal-008-category-search
title: 分类和搜索
aliases: [请介绍一下项目中的分类和搜索。, 你在分类和搜索方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [商品搜索, 首页数据, 防抖]
---

# 分类和搜索

## 核心回答

分类页根据用户选择的分类 ID 请求商品列表，首页的分类入口也可以直接定位到对应栏目。搜索页把“输入联想”和“正式搜索”分开：用户输入时经过 500ms 防抖后请求 AI 建议，按下搜索键或者点击热门标签时才真正查询商品。这样可以减少用户连续输入过程中的无效请求，又不会把每个联想词都当成一次正式搜索。

搜索页还保存最近 10 条历史记录，写入前会去掉空格和重复项，并把最新搜索放到最前面。热门搜索接口失败时使用本地热门词，AI 建议失败时使用本地品类规则和通用建议，所以辅助功能失败不会阻止用户进行普通商品搜索。

## 回答要点

- 分类页根据用户选择的分类 ID 请求商品列表，首页的分类入口也可以直接定位到对应栏目。
- 搜索页把“输入联想”和“正式搜索”分开：用户输入时经过 500ms 防抖后请求 AI 建议，按下搜索键或者点击热门标签时才真正查询商品。
- 这样可以减少用户连续输入过程中的无效请求，又不会把每个联想词都当成一次正式搜索。
- 搜索页还保存最近 10 条历史记录，写入前会去掉空格和重复项，并把最新搜索放到最前面。

## 面试官可能追问

- 关于“分类和搜索”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [分类页第 135～191 行](/Users/aaron/personal-hub/apps/project-2/src/views/Category.vue:135)：分类切换、首页入口映射和商品请求。
> - [搜索页第 269～305 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:269)：热门词、历史读取、搜索和历史去重保存。
> - [搜索页第 308～347 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:308)：正式商品搜索和标签搜索入口。
> - [搜索页第 348～410 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:348)：AI 联想、防抖触发和响应有效性判断。
> - [搜索页第 432～467 行](/Users/aaron/personal-hub/apps/project-2/src/views/Search.vue:432)：本地建议和可取消的 debounce。
