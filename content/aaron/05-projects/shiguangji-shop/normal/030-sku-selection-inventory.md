---
id: shiguangji-shop-normal-030-sku-selection-inventory
title: SKU 选择还没有完整处理无效组合和库存
aliases: [请介绍一下项目中的SKU 选择还没有完整处理无效组合和库存。, 你在SKU 选择还没有完整处理无效组合和库存方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: normal
projects: [拾光集移动商城系统]
keywords: [SKU, 验证方法, 服务端计价]
---

# SKU 选择还没有完整处理无效组合和库存

## 核心回答

当前 SKU 通过属性字符串精确匹配，依赖属性顺序一致。例如“颜色:黑;尺码:M”和“尺码:M;颜色:黑”语义相同，但字符串不相等。用户选择了不存在的组合时，代码还会保留上一次匹配成功的 SKU，可能导致页面选择和实际提交的 skuId 不一致。

后续可以先按固定属性顺序生成稳定的组合键，建立“组合—SKU”的索引；用户每选一个属性，就根据剩余有效组合禁用无法购买或无库存的选项。没有匹配结果时清空当前 SKU 并禁止加购，最终库存和价格仍由服务端验证。

## 回答要点

- 当前 SKU 通过属性字符串精确匹配，依赖属性顺序一致。
- 例如“颜色:黑;尺码:M”和“尺码:M;颜色:黑”语义相同，但字符串不相等。
- 用户选择了不存在的组合时，代码还会保留上一次匹配成功的 SKU，可能导致页面选择和实际提交的 skuId 不一致。
- 后续可以先按固定属性顺序生成稳定的组合键，建立“组合—SKU”的索引；

## 面试官可能追问

- 关于“SKU 选择还没有完整处理无效组合和库存”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [商品详情第 385～404 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:385)：拆分规格并默认选中第一条 SKU。
> - [商品详情第 405～417 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:405)：按原顺序拼接字符串，未匹配时保留旧值。
> - [商品详情第 422～464 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:422)：加购和购买提交当前保存的 skuId。
