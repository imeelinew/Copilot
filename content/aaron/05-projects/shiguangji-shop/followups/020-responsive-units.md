---
id: shiguangji-shop-followup-020-responsive-units
title: 追问：为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？
aliases: [能具体解释一下为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系吗？, 从设计取舍看，为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [移动端适配, PostCSS, Vant Weapp]
---

# 追问：为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系？

## 核心回答

项目按照 750px 宽的设计稿开发，PostCSS 以 75px 等于 1rem，把业务样式中的 px 自动转换成 rem。运行时根字号的公式可以简化成“有效视口宽度除以 10”：320px 屏幕时 1rem 是 32px，整个页面 10rem 正好是 320px；375px 及更宽时，根字号封顶为 37.5px，10rem 就是 375px。

这样既能让手机尺寸等比例缩放，也能让桌面浏览器保持手机宽度，不会无限放大。vw 配合 `max-width` 同样可以实现响应式，我选择 rem 主要是为了沿用 750 设计稿和统一换算，不会说 rem 天生比 vw 更好。

这里有一个实际容易出错的点：业务 CSS 会被 pxtorem 转换，如果直接写 `max-width: 375px`，构建后会成为 5rem，在 375px 视口下只有 187.5px，相当于换算了两次，所以容器直接写 10rem。固定底栏还要单独居中，购买弹层则使用左右边界和自动外边距，避免修改 transform 后覆盖 Vant 原来的进出动画。

## 回答要点

- 项目按照 750px 宽的设计稿开发，PostCSS 以 75px 等于 1rem，把业务样式中的 px 自动转换成 rem。
- 运行时根字号的公式可以简化成“有效视口宽度除以 10”：320px 屏幕时 1rem 是 32px，整个页面 10rem 正好是 320px；
- 375px 及更宽时，根字号封顶为 37.5px，10rem 就是 375px。
- 这样既能让手机尺寸等比例缩放，也能让桌面浏览器保持手机宽度，不会无限放大。

## 面试官可能追问

- 关于“为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系”，你为什么选择当前方案？
- “为什么使用 rem，不直接使用 vw 或 px？750、75、375 和 10rem 是什么关系”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [rem.ts 第 1～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:1)：750、75、375 和根字号计算。
> - [Vite 配置第 49～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:49)：pxtorem 基准和 node_modules 排除规则。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 容器和固定元素居中。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航栏对齐手机容器。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层保留原 transform 的居中方式。
