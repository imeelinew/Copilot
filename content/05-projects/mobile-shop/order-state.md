---
id: mobile-shop-order-state
title: 为什么使用 sessionStorage 保存订单确认数据？
aliases: [订单数据为什么存在本地, sessionStorage使用场景, 跨页面状态]
category: mobile-shop
difficulty: 项目
priority: high
projects: [轻购]
keywords: [sessionStorage, 路由, 订单确认, 跨页面]
---

# 为什么使用 sessionStorage 保存订单确认数据？

## 30 秒回答

购物车或商品详情进入订单确认页时，需要传递多项商品和地址数据，放在 URL 中会过长且暴露内容，单纯放组件状态又会在刷新后丢失。所以我使用 sessionStorage 维护这段临时流程状态：同一标签页刷新仍然存在，关闭标签页后会清除，订单创建成功后也主动删除。

## 标准回答

订单确认数据具有“跨路由、短生命周期、刷新后仍要保留”的特点。它包含商品、规格、数量等嵌套信息，如果全部放在 query 中，不仅 URL 很长，也不便于序列化和修改；如果只保存在页面内存中，刷新订单确认页就会丢失。

因此我在购物车或商品详情页把订单参数序列化到 sessionStorage，订单确认页读取并校验。用户切换地址后同步更新临时状态，创建订单成功后立即删除。相比 localStorage，sessionStorage 的生命周期更符合一次购物流程，而且不同标签页相互隔离。

在更完整的生产系统中，我会优先传递商品或结算单 ID，再由服务端重新计算库存、价格和优惠。前端保存的数据只能用于页面展示，不能作为最终结算可信来源。

## 回答要点

- 解释跨路由、刷新恢复和短生命周期三个原因。
- 主动说明前端数据不能作为价格和库存的最终依据。

## 面试官可能追问

- 为什么不用 Pinia？
- sessionStorage 和 localStorage 有什么区别？
- 用户篡改 sessionStorage 中的价格怎么办？

## 代码证据

- /Users/eli/Dev/mobile-shop/src/views/CartView.vue
- /Users/eli/Dev/mobile-shop/src/views/ProductDetailView.vue
- /Users/eli/Dev/mobile-shop/src/views/OrderConfirmView.vue
