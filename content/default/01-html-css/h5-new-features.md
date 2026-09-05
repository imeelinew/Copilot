---
id: h5-new-features
title: HTML5 有哪些新特性？
aliases: [html5新特性, h5, 语义化标签, canvas, 本地存储]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [HTML5, 语义化标签, canvas, 本地存储]
---

# HTML5 有哪些新特性？

## 核心回答

我按大类来说：一是语义化标签，header、footer、nav、article、section 这些；二是多媒体，audio 和 video 标签让网页放音视频不再依赖插件；三是表单增强，input 的 type 多了 email、number、date、range 这些，配合 placeholder、required 能做基础校验；四是本地存储，localStorage 和 sessionStorage；五是绘图能力，Canvas 画布；再往上是地理定位、拖放、WebSocket、Web Worker 这些能力型 API。

日常工作里真实常用的是语义标签、表单类型、本地存储这三块，回答时结合自己用过的说最稳。

## 展开回答

有个容易记混的地方：querySelector 是 DOM API，JSON.parse 和 stringify 是 ES5 的方法，早年宣传时常和 HTML5 打包在一起说，其实不算 HTML5 的东西。Canvas 是 HTML5 提供的画布元素，Three.js、D3 这些是基于它的独立库，别混为一谈。

## 面试官可能追问

- video 标签怎么处理格式兼容？
- HTML5 自带的表单校验够用吗？
- Web Worker 是干什么的？
