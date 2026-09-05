---
id: css-specificity
title: CSS 选择器优先级是怎么算的？
aliases: [选择器权重, css优先级, important, 样式覆盖]
category: html-css
difficulty: 高频
priority: normal
projects: []
keywords: [优先级, important, id选择器, class选择器]
---

# CSS 选择器优先级是怎么算的？

## 核心回答

优先级按档位从高到低比：内联样式、ID 选择器、class 这一档（类选择器、属性选择器、伪类同档）、标签这一档（标签选择器和伪元素同档）。比较时从左往右，高位分出胜负就结束。!important 单独一档，能压过包括内联在内的普通声明，但要尽量少用。同优先级的情况下，写在后面的覆盖前面的。

背个顺序就是：!important > 内联 > id > class/伪类/属性选择器 > 标签/伪元素 > 通配符。继承来的样式没有优先级，任何直接命中的规则都赢过继承。

## 展开回答

两个易错点。第一，优先级是逐位比不是求和，十个 class 叠一起也打不过一个 id。第二，:hover 和 .foo 是同一档的，谁赢看源码顺序。排查样式不生效，我直接开 DevTools 看哪条声明被划掉、被哪条覆盖，而不是无脑加 !important，那东西加多了后面没法维护。

## 面试官可能追问

- !important 写的样式还能被覆盖吗？
- :hover 和 .class 的优先级谁高？
- 样式被覆盖了怎么排查？
