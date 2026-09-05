---
id: js-typescript
title: TypeScript 在项目里是怎么用的？
aliases: [ts使用经验, interface和type区别, ts泛型, 为什么用typescript]
category: javascript
difficulty: 高频
priority: high
projects: [轻购, 城市视图]
keywords: [interface, type, 泛型, 联合类型, unknown]
---

# TypeScript 在项目里是怎么用的？

## 30 秒回答

轻购和城市视图是全程 TypeScript。日常用法集中在四处：按模块给接口响应定义类型，请求层统一用 Response<T> 这样的泛型包装；组件 props 用 interface 声明；状态用字面量联合类型约束，比如图表类型、工单状态；不确定的数据用 unknown 接住再收窄，基本不用 any。最大的收益是重构时编译器能帮你找齐所有受影响的位置，AI 生成的代码也多了一道类型检查闸门。

## 标准回答

以轻购为例，src/types 下按模块组织类型：购物车的嵌套结构、搜索的联想结果都定义了明确的 interface，Axios 封装里用泛型 Response<T> 约定"状态码加业务数据"的外层结构，调用方拿到的数据自带类型提示。

联合类型我用得很多，因为它能把非法状态挡在编译期。比如工单状态是"待分配、待处理、处理中、待回访、已完成"的联合，函数参数声明成这个联合后，传别的字符串直接编译报错；图表配置里柱状图、折线图、饼图、散点图也是联合类型，配合 switch 收窄，每种图表能用的字段一目了然。

interface 和 type 我都用了，习惯是描述对象结构用 interface，联合类型、工具类型和复杂组合用 type。泛型除了请求层，还用在通用列表组件上，把行数据类型参数化。

原则上有三条：不写 any，不确定的用 unknown 再收窄；类型跟着数据走，接口变了先改类型定义，让编译器指出所有需要调整的地方；不追求高级类型体操，可读性优先。

## 回答要点

- 用具体模块（types 目录、Response 泛型）证明是真用过。
- 联合类型约束工单状态是很好的例子，把类型和业务连起来。
- 主动说"不用 any、不玩类型体操"的原则。

## 面试官可能追问

- interface 和 type 到底有什么区别？
- any 和 unknown 的区别？
- 泛型在什么场景下真正有用？
- 枚举和字面量联合类型怎么选？
