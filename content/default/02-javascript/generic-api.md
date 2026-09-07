---
id: ts-generic-api
title: 泛型在前端 API 封装里怎么用？
aliases: [TypeScript 泛型请求, 泛型函数, API 响应类型]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [泛型, API, Promise, response, TypeScript]
---

# 泛型在前端 API 封装里怎么用？

## 核心回答

如果请求外壳固定，里面的 data 由接口决定，就可以把 data 写成泛型。比如 `request<T>()` 返回 `Promise<ApiResponse<T>>`，商品列表传 Product[]，用户详情传 User。这样公共请求逻辑只写一份，调用处仍然有准确的提示。

泛型解决的是类型复用，不会替我验证服务器数据。T 是调用方对响应的约定，真正不可信的输入仍要先做运行时校验。类型参数太复杂时，我宁愿拆成几个清楚的类型，也不写一行看不懂的类型体操。

## 追问：泛型约束什么时候需要？

当函数要读取类型上的某个字段时，就给 T 加约束，比如 `T extends { id: string }`。没有约束时，泛型函数不能假设 T 一定有 id。约束应该表达真实需求，不能为了消除报错随便写成 `any`。

## 追问：分页响应怎么写？

把列表项和分页信息分开：`PageResult<T> = { records: T[]; page: number; pageSize: number; total: number }`。接口只要替换 T 就能复用。空列表、最后一页和 total 不可信时，页面仍要有自己的边界处理。

## 追问：为什么不直接把所有接口返回都写成 any？

短期省事，后面字段改名时编译器帮不上忙，组件也容易把数字当字符串用。泛型让公共部分保持复用，具体接口保留类型，维护成本反而更低。
