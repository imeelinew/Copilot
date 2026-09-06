---
id: shiguangji-shop-normal-017-responsive-units
title: 难点二：桌面上保持手机宽度时，不能让 rem 被换算两次
aliases: [请介绍一下项目中的桌面上保持手机宽度时，不能让 rem 被换算两次。, 你在桌面上保持手机宽度时，不能让 rem 被换算两次方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: high
projects: [拾光集移动商城系统]
keywords: [移动端适配, 组件设计, 验证方法, PostCSS, Vant Weapp]
---

# 难点二：桌面上保持手机宽度时，不能让 rem 被换算两次

## 核心回答

移动端页面在电脑浏览器中保持 375px 宽时，遇到过一个容易忽略的单位问题。业务 CSS 会由 PostCSS 按 75 的基准把 px 转成 rem。如果我直接在这部分样式里写 `max-width: 375px`，构建后它会变成 5rem；而运行时 1rem 是 37.5px，最终宽度只有 187.5px，相当于被换算了两次。

所以页面最大宽度直接写成 10rem，运行时根字号按 375px 封顶，这样 10rem 正好等于 375px。普通页面、固定底栏和弹层还需要使用同一个宽度规则。固定底栏可以用水平位移居中，但购买弹层本身有 Vant 的进出动画，如果再修改它的 transform，可能覆盖组件原来的动画，所以弹层改用左右边界和自动外边距居中。

验证时我会分别切换到 320px、375px 和桌面宽屏，检查页面、底栏和弹层宽度是否一致，并实际打开关闭弹层，看它有没有横向偏移或动画异常。

## 回答要点

- 移动端页面在电脑浏览器中保持 375px 宽时，遇到过一个容易忽略的单位问题。
- 业务 CSS 会由 PostCSS 按 75 的基准把 px 转成 rem。
- 如果我直接在这部分样式里写 max-width: 375px，构建后它会变成 5rem；
- 而运行时 1rem 是 37.5px，最终宽度只有 187.5px，相当于被换算了两次。

## 面试官可能追问

- 关于“桌面上保持手机宽度时，不能让 rem 被换算两次”，你为什么选择当前方案？
- “桌面上保持手机宽度时，不能让 rem 被换算两次”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [rem.ts 第 9～15 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:9)：根字号公式和 375px 封顶。
> - [Vite 配置第 52～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:52)：业务 CSS 按 75 把 px 转成 rem。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 页面宽度和固定栏居中规则。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航宽度和水平定位。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层不覆盖原有 transform 的居中方式。
> - [index.html 第 11～27 行](/Users/aaron/personal-hub/apps/project-2/index.html:11)：JavaScript 执行前的初始根字号和容器样式。
