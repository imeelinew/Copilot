---
id: coding-array-object-utils
title: flatten、groupBy、去重和分页题怎么讲取舍？
aliases: [手写 flatten, groupBy, 数组去重, 分页]
category: coding
difficulty: 基础
priority: normal
projects: []
keywords: [flatten, groupBy, 去重, 分页]
---

# flatten、groupBy、去重和分页题怎么讲取舍？

## 核心回答

我会先确认是否允许修改原数组、深度规则、空值处理和稳定顺序。flatten 可以用显式栈避免深递归；groupBy 用 Map 按 key 收集；按字段去重也用 Map 保留第一次或最后一次；分页则明确 page 从 0 还是 1 开始，并对负数、pageSize 和超出范围做约定。代码短不代表边界自动正确，先把契约说清楚比背一行 reduce 更重要。

## 追问：为什么不全用 reduce？

reduce 能写得很紧凑，但遇到异步、早停、深度遍历或多个状态时，可读性和调试性会变差。面试里我会选能清楚表达不变量的循环或栈，必要时再说明等价的函数式写法。性能上关注是否重复扫描、是否创建过多临时数组，而不是盲目追求一行代码。

## 追问：分页和后端分页有什么不同？

前端分页适合数据量已经完整加载、需要本地切页的场景；数据量大、实时性高或权限敏感时应让后端分页和过滤。后端分页要处理 total 变化、游标或 offset、重复数据和请求竞态，前端仍要保留 loading、空态和错误重试。

