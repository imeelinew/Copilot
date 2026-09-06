---
id: yunshu-smart-city-followup-002-ai-key-aes
title: 追问：把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？
aliases: [能具体解释一下把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗吗？, 从设计取舍看，把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？, 这个问题在项目中的实际边界是什么？]
category: yunshu-smart-city
difficulty: 深入
priority: normal
projects: [云枢智慧城市数据平台]
keywords: [AI Key, AES, 列表 Key]
---

# 追问：把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗？

## 核心回答

不能直接变安全。AES 是对称加密，加密和解密需要同一类密钥；如果密文、解密密钥和解密逻辑都交给浏览器，能执行页面脚本的人仍可能拿到解密能力，所以只是改变了存储形式，没有把秘密和客户端隔离。Vite 的 `VITE_` 环境变量也会被打进前端产物，适合放公开配置，不适合保存平台密钥。当前代码实际上是把 AI 配置 JSON 序列化后直接保存，没有使用 AES。真正需要保护平台 Key 时，我会把模型调用放到受控服务端；用户自带 Key 时，则明确保存范围并允许不持久化。

## 回答要点

- AES 是对称加密，加密和解密需要同一类密钥；
- 如果密文、解密密钥和解密逻辑都交给浏览器，能执行页面脚本的人仍可能拿到解密能力，所以只是改变了存储形式，没有把秘密和客户端隔离。
- Vite 的 VITE_ 环境变量也会被打进前端产物，适合放公开配置，不适合保存平台密钥。
- 当前代码实际上是把 AI 配置 JSON 序列化后直接保存，没有使用 AES。

## 面试官可能追问

- 关于“把 Key 用 AES 加密后再存，或者放到 Vite 环境变量，就安全了吗”，当前方案具体防住了什么风险？
- 客户端被注入脚本或凭据过期时会发生什么？
- 服务端还必须补充哪些校验或权限控制？

## 代码证据

>
> - [AI.tsx，第 68～78 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:68)：配置经过 JSON 序列化后直接保存，没有加密步骤。
> - [AI.tsx，第 149～160 行](/Users/aaron/personal-hub/apps/project-1/src/pages/AI.tsx:149)：前端读取配置并生成 `X-AI-*` 请求头。
> - [amap.ts，第 1～4 行](/Users/aaron/personal-hub/apps/project-1/src/config/amap.ts:1)：项目中 `VITE_` 环境变量的实际客户端使用示例。
