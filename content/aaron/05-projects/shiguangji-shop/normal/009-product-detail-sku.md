---
id: shiguangji-shop-normal-009-product-detail-sku
title: 商品详情和 SKU
aliases: [请介绍一下项目中的商品详情和 SKU。, 你在商品详情和 SKU方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [商品详情, SKU, 影视详情, 服务端计价, XSS, 加载状态]
---

# 商品详情和 SKU

## 核心回答

商品详情页先请求商品主体数据，包括图片、价格、富文本介绍和 SKU 列表。主体数据回来后就结束首屏 loading，让用户先看到商品；收藏状态和评价统计再并行加载，AI 卖点作为独立内容继续处理，避免这些辅助信息一直挡住商品主体。

SKU 数据中，每个商品规格由一组类似“颜色:黑色;尺码:M”的字符串表示。我先拆分每一条 SKU，再用 Set 收集每个属性下不重复的选项。用户切换颜色或尺码时，页面把当前选择重新组成属性字符串，在 SKU 列表中查找对应商品，得到真正提交时使用的 skuId。加购和立即购买前，还会检查商品 ID、店铺 ID 和 skuId 是否已经准备好，避免数据没加载完成就发送请求。

## 回答要点

- 商品详情页先请求商品主体数据，包括图片、价格、富文本介绍和 SKU 列表。
- 主体数据回来后就结束首屏 loading，让用户先看到商品；
- 收藏状态和评价统计再并行加载，AI 卖点作为独立内容继续处理，避免这些辅助信息一直挡住商品主体。
- SKU 数据中，每个商品规格由一组类似“颜色:黑色;尺码:M”的字符串表示。

## 面试官可能追问

- 关于“商品详情和 SKU”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [商品详情第 325～372 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:325)：主体、收藏评价和 AI 的加载顺序。
> - [商品详情第 385～417 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:385)：拆分属性、Set 去重、默认选择和组合匹配。
> - [SkuTags 第 1～25 行](/Users/aaron/personal-hub/apps/project-2/src/components/SkuTags.vue:1)：规格标签展示和选择事件。
> - [商品详情第 196～230 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:196)：加购和立即购买弹层使用 SKU 标签。
> - [商品详情第 422～464 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:422)：ID 检查、加购参数和立即购买参数。
