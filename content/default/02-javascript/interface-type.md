---
id: typescript-interface-type-choice
title: interface 和 type 在项目里怎么取舍？
aliases: [interface vs type, TypeScript 类型声明]
category: javascript
difficulty: 进阶
priority: normal
projects: []
keywords: [TypeScript, interface, type, declaration merging]
---

# interface 和 type 在项目里怎么取舍？

## 核心回答

两者都能描述对象契约，团队最重要的是保持一致。interface 支持 extends 和声明合并，适合公开的对象形状或需要被库扩展的契约；type 更方便表达联合、交叉、元组和条件类型。它们都不是运行时校验，也不能因为换了写法就改变 API 行为。我会按项目约定选择，并避免让同一个领域类型在多个文件用两套名字表达。

## 追问：声明合并什么时候会带来风险？

同名 interface 可能被不同模块或全局声明悄悄合并，第三方类型增强时很有用，但业务代码里也可能让字段来源不清楚。公共扩展点要有文档和测试，普通领域模型更倾向显式导入和组合，避免依赖隐藏合并。

## 追问：如何设计可演进的 API 类型？

把成功、业务失败、鉴权失败和网络失败分成明确的联合类型，列表和分页字段统一命名。对后端未知字段不要假设一定存在，版本新增字段保持向后兼容；如果接口属于公共边界，就在运行时解析后再暴露强类型结果。

