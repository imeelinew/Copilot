---
id: shiguangji-shop-normal-002-mobile-layout
title: 移动端适配
aliases: [请介绍一下项目中的移动端适配。, 你在移动端适配方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [移动端适配, 页面导航, PostCSS]
---

# 移动端适配

## 核心回答

移动端适配这一块，我采用的是 rem 方案。项目的设计稿宽度是 750px，PostCSS 会按照 75px 等于 1rem，把业务样式里的 px 自动转换成 rem。页面运行时再根据设备宽度动态设置根字号，所以同一套样式在不同手机宽度下可以等比例缩放。

改进版还把页面的最大显示宽度限制为 375px。原因是这个项目本身是手机商城，如果在电脑上直接按浏览器宽度继续放大，图片、按钮和文字都会显得很夸张。因此屏幕超过 375px 后，页面保持 375px 宽并居中显示。底部导航栏和购买弹层属于固定定位元素，我又单独让它们和中间的手机容器对齐，防止页面已经居中，底栏却仍然贴着整个浏览器窗口。

这里的重点不是“用了 rem”这一个词，而是**设计稿尺寸、运行时根字号和页面最大宽度使用了同一套换算关系**。例如在 375px 的视口下，根字号是 37.5px，整个页面宽 10rem，也就是 375px。

## 回答要点

- 移动端适配这一块，我采用的是 rem 方案。
- 项目的设计稿宽度是 750px，PostCSS 会按照 75px 等于 1rem，把业务样式里的 px 自动转换成 rem。
- 页面运行时再根据设备宽度动态设置根字号，所以同一套样式在不同手机宽度下可以等比例缩放。
- 改进版还把页面的最大显示宽度限制为 375px。

## 面试官可能追问

- 关于“移动端适配”，你为什么选择当前方案？
- “移动端适配”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

> - [main.ts 第 1～15 行](/Users/aaron/personal-hub/apps/project-2/src/main.ts:1)：加载全局样式、rem 脚本和图片懒加载。
> - [rem.ts 第 1～23 行](/Users/aaron/personal-hub/apps/project-2/src/utils/rem.ts:1)：按视口宽度计算根字号，并限制最大宽度为 375px。
> - [Vite 配置第 49～63 行](/Users/aaron/personal-hub/apps/project-2/vite.config.ts:49)：PostCSS 的 px 转 rem 配置。
> - [main.css 第 1～30 行](/Users/aaron/personal-hub/apps/project-2/src/assets/main.css:1)：10rem 页面容器和固定元素居中。
> - [Tabbar 第 45～54 行](/Users/aaron/personal-hub/apps/project-2/src/components/Tabbar.vue:45)：底部导航栏对齐手机容器。
> - [商品详情第 809～815 行](/Users/aaron/personal-hub/apps/project-2/src/views/ProdInfo.vue:809)：购买弹层的最大宽度和居中方式。
