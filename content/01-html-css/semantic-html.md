---
id: css-semantic-html
title: 怎么理解语义化标签？
aliases: [语义化的理解, html语义化, 语义化标签好处]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [可访问性, SEO, button, nav, aria]
---

# 怎么理解语义化标签？

## 核心回答

就是别满屏 div，该是什么就用什么：导航用 nav，列表用 ul，能点的动作用 button。好处三层：读屏软件和键盘用户能理解页面结构；爬虫更容易识别内容主次；代码本身可读，接手别人项目不用猜每一块是什么。

我自己最有体会的是 button 和 div 加 onclick 的差别。原生 button 自带键盘焦点、回车空格能触发、disabled 自动挡交互，读屏还会播报它是按钮；div 这些全得手动补，实际项目里基本都会漏。

## 展开回答

后台系统对 SEO 不敏感，但可维护性的收益一样在：结构语义清晰，改版只动 CSS 就行。语义化也别过度，不是为了标签而标签，一段普通文字硬套 article 就没意思了。

如果被追问 SPA 的 SEO，我知道的方向是 SSR 和预渲染，自己的项目还没做到这一步，会如实说。aria 方面我常用的是给纯图标按钮补 aria-label 这种，让读屏至少知道按钮是干什么的。

## 面试官可能追问

- button 相比 div 具体多了哪些默认行为？
- SPA 怎么做 SEO？
