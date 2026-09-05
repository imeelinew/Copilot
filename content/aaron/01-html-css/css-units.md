---
id: css-units
title: px、em、rem 有什么区别？
aliases: [css单位, rem适配, em rem, 相对单位]
category: html-css
difficulty: 高频
priority: high
projects: []
keywords: [px, em, rem, 字号]
---

# px、em、rem 有什么区别？

## 核心回答

px 是固定像素，写多少就是多少，不跟着任何东西缩放，适合边框、分隔线这种不想被放大的细节。em 相对当前元素的 font-size，有个细节：em 用在 font-size 属性上时，相对的是父元素的字号，所以会一层层叠下去，嵌套深了不好算。rem 相对根元素 html 的字号，整个页面就一个基准，可控性比 em 好得多。

实际用法上，移动端适配的经典方案就是 rem：html 的字号跟着屏幕宽度算，元素尺寸全用 rem，整页就能等比缩放。组件内部想跟字号联动的地方用 em，比如按钮的 padding 用 em，字号变大内边距自动跟着变。

## 展开回答

现在 vw 也成了主流方案，直接相对视口宽度，不需要 JS 动态算根字号。我的选择是整体布局尺寸用 rem 或 vw，1px 边框这类细节用 px，各干各的活。

## 面试官可能追问

- em 具体相对谁计算？
- rem 和 vw 两种适配方案怎么选？
- px 写死在响应式布局里有什么问题？
