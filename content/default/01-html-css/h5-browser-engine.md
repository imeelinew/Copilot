---
id: h5-browser-engine
title: 对浏览器内核的理解？
aliases: [浏览器内核, 渲染引擎, js引擎, blink, webkit]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [渲染引擎, JS引擎, Blink, V8]
---

# 对浏览器内核的理解？

## 核心回答

浏览器内核主要指两个引擎：渲染引擎负责解析 HTML 和 CSS、构建渲染树、把页面画出来；JS 引擎负责解析和执行 JavaScript。平时说某个浏览器是什么内核，一般指的是渲染引擎。

现状记四条就够用：Chrome 和 Edge 用 Blink，配的 JS 引擎是 V8；Safari 用 WebKit，配 JavaScriptCore；Firefox 用 Gecko，配 SpiderMonkey；Opera 早年有自己的 Presto，后来也改用 Blink 了。现在国产浏览器基本都是 Chromium 内核，IE 的 Trident 已经是历史。

## 展开回答

这题通常是个引子，答完可以主动往渲染流程上带，比如渲染引擎怎么从 DOM 和 CSSOM 一路画到屏幕上，这部分我单独准备过。还有个相关知识点：渲染引擎和 JS 引擎是互斥的，JS 执行时渲染会停下来，因为 JS 可能改 DOM，这也是很多渲染性能问题的根源。

## 面试官可能追问

- 渲染引擎和 JS 引擎分别负责什么？
- 为什么 JS 执行的时候页面渲染会停？
- 浏览器是怎么渲染页面的？
