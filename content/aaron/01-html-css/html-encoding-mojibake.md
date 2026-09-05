---
id: html-encoding-mojibake
title: 浏览器打开网页出现乱码，是什么原因？
aliases: [乱码, 字符编码, utf-8, charset]
category: html-css
difficulty: 基础
priority: normal
projects: []
keywords: [编码, charset, utf-8, 解码]
---

# 浏览器打开网页出现乱码，是什么原因？

## 核心回答

乱码的本质就一句话：文件保存时用的编码，和浏览器解码时用的字符集对不上。字节本身没错，只是被按错误的编码表翻译了，比如文件是 UTF-8 存的，浏览器按 GBK 去解，中文就花了。常见来源有两种：一是 HTML 里没写 charset 声明，或者声明的和文件实际保存的编码不一致；二是服务器响应头 Content-Type 里带的 charset 和文件冲突，响应头的优先级更高。

解决思路就是全链路统一成 UTF-8：编辑器把文件存成 UTF-8，head 里加 meta charset 声明 UTF-8，服务器响应头也对上，三处一致基本就不会乱。

## 展开回答

还有一种看起来像乱码其实不是：字符解码是对的，但页面字体缺这个字形，浏览器显示方框或者换后备字体，这是字体问题不是编码问题。排查顺序是先看声明的 charset，再确认文件实际编码，最后才查字体。

## 面试官可能追问

- meta charset 应该放在什么位置？
- 响应头和 meta 都声明了编码，听谁的？
- 为什么推荐 UTF-8 而不是 GBK？
