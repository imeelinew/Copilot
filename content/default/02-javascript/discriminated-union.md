---
id: ts-discriminated-union
title: 如何用可辨识联合描述请求状态？
aliases: [联合类型状态机, TypeScript 请求状态, discriminated union]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [联合类型, 状态机, loading, error, TypeScript]
---

# 如何用可辨识联合描述请求状态？

## 核心回答

我会给每种状态一个字面量字段，比如 `status: 'idle' | 'loading' | 'success' | 'error'`。success 状态才带 data，error 状态才带 message。渲染时先判断 status，TypeScript 就能知道当前分支一定有对应字段，避免 data、error、loading 三个字段互相矛盾。

这比写成一堆可选字段更可靠。后者可能出现 `loading: false` 但 data 和 error 都没有的状态，而联合类型会逼着我把状态变化写完整。

## 追问：和 enum 有什么关系？

enum 可以集中定义一组值，但它本身不能表达每种状态携带的数据。可辨识联合的重点是“标签和数据绑定”，不是有没有一个枚举名字。小范围状态我通常直接用字符串联合，读取代码更直观。

## 追问：状态转换应该放在哪？

简单请求可以在 hook 或组件里处理；状态多、转移有规则时，我会用 reducer 或单独的 transition 函数。每次只接收当前状态和事件，返回下一个合法状态，测试也会更容易写。

## 追问：接口成功但业务失败怎么表达？

HTTP 成功不代表业务成功。响应类型里可以把 `success: true` 和 `success: false` 做成可辨识联合；请求层先处理网络和 HTTP 错误，业务层再处理接口返回的业务错误，别把两种失败混成一个字符串。
