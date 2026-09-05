---
id: engineering-fetch-axios
title: fetch 和 axios 有什么区别？
aliases: [fetch区别, axios封装, fetch优缺点, 请求库选型]
category: engineering
difficulty: 高频
priority: high
projects: [智服工单]
keywords: [fetch, axios, XHR, 拦截器]
---

# fetch 和 axios 有什么区别？

## 核心回答

fetch 是浏览器原生的请求 API，更底层，返回 Promise；axios 是封装库，浏览器端基于 XHR，开箱自带拦截器、自动 JSON 转换、timeout 配置这些能力。

fetch 有几个著名的坑要能说出来：只有网络层面失败才 reject，404、500 照样走 then，得自己判断 res.ok；默认不带 cookie，跨域请求要显式配 credentials；没有内置超时，取消请求要用 AbortController 配 setTimeout 自己实现。axios 这些全是现成的，超时一个配置项，取消也支持传 AbortController 的 signal。

项目里我一直用的是封装过的 axios：请求拦截器统一带 token，响应拦截器统一处理错误码和过期跳转，业务代码不用每个请求都操心这些。

## 展开回答

细节上，fetch 拿到的是 Response 对象， body 要再 await 一次 res.json() 才是数据；上传进度这种 fetch 原生拿不到，XHR 反而能监听 progress。选型上我做小 demo 或者对包体积敏感就用 fetch 加一层薄封装，正经业务项目用封装好的 axios 更省事，两者没有绝对优劣，关键是团队统一。

## 面试官可能追问

- fetch 怎么取消请求？
- 404 的时候 fetch 走 then 还是 catch？
- axios 拦截器你在项目里具体做了什么？
