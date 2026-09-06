---
id: yingke-movies-followup-007-axios-adapter-axios-promisify-adaptor
title: 追问：`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？
aliases: [能具体解释一下`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗吗？, 从设计取舍看，`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？, 这个问题在项目中的实际边界是什么？]
category: yingke-movies
difficulty: 深入
priority: high
projects: [映刻影视]
keywords: [Axios, 请求适配器, uni.request, uni-app]
---

# 追问：`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗？

## 核心回答

不是一回事。`uni.promisify.adaptor.js` 是对 uni-app 返回的 Promise 做统一转换，把类似错误和结果组合的返回值转换成标准的 resolve 或 reject；Axios adapter 则负责把 Axios 请求配置转换成 `uni.request`。它们处理的是不同层次的问题，而且当前 Axios adapter 调用 `uni.request` 时使用的是 success、fail 回调，并不是依靠 promisify 文件完成请求。这个区分很重要，不能因为名字里都有 adapter 就把两者混在一起。

## 回答要点

- uni.promisify.adaptor.js 是对 uni-app 返回的 Promise 做统一转换，把类似错误和结果组合的返回值转换成标准的 resolve 或 reject；
- Axios adapter 则负责把 Axios 请求配置转换成 uni.request。
- 它们处理的是不同层次的问题，而且当前 Axios adapter 调用 uni.request 时使用的是 success、fail 回调，并不是依靠 promisify 文件完成请求。
- 这个区分很重要，不能因为名字里都有 adapter 就把两者混在一起。

## 面试官可能追问

- 关于“`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗”，你为什么选择当前方案？
- “`uni.promisify.adaptor.js` 和 Axios adapter 是一回事吗”在异常数据或并发场景下怎么处理？
- 如果改用替代方案，主要成本和收益分别是什么？

## 代码证据

>
> - [uni.promisify.adaptor.js 第 1～13 行](</Users/aaron/CodingPractice/14_uniapp/project2/uni.promisify.adaptor.js:1>)：统一转换 uni-app Promise 返回值。
> - [main.js 第 3～11 行](</Users/aaron/CodingPractice/14_uniapp/project2/main.js:3>)：Vue 2 启动时全局导入 promisify 适配文件。
> - [utils/request.js 第 4～25 行](</Users/aaron/CodingPractice/14_uniapp/project2/utils/request.js:4>)：Axios adapter 使用 `uni.request` 回调。
