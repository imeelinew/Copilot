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

## 核心回答

轻购和城市视图是全程 TypeScript。用得最多的就几件事：接口返回的数据定义类型，请求层用泛型把"外层状态码加业务数据"这个结构统一起来，调用方拿到的数据自带类型提示；组件 props 用 interface 声明；状态用字面量联合类型约束。

我觉得类型最大的价值在重构的时候：接口字段一改，编译器把所有受影响的地方全标出来，比全局搜索靠谱多了。

## 展开回答

字面量联合类型值得举个例子：工单状态就是"待分配"到"已完成"这几个字符串的联合，函数参数声明成这个联合，传别的字符串直接编译不过，非法状态根本写不出来，比运行时才发现强太多。

interface 和 type 这个问题被问烂了，我的用法是描述对象结构用 interface，联合类型和工具类型用 type，大多数场景能互换，统一就行。泛型除了请求层，通用组件也用，比如列表组件把行数据类型参数化。底线两条：不写 any，不确定的用 unknown 接住再收窄；不玩高级类型体操，类型是给人看的。

## 面试官可能追问

- interface 和 type 到底有什么区别？
- any 和 unknown 的区别？
- 枚举和字面量联合怎么选？
