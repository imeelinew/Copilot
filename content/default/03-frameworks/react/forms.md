---
id: react-form-state
title: React 表单应该用受控还是非受控？
aliases: [React 表单, controlled uncontrolled]
category: react
difficulty: 进阶
priority: high
projects: []
keywords: [React, 表单, controlled, uncontrolled, 校验]
---

# React 表单应该用受控还是非受控？

## 核心回答

受控表单把输入值放在 React state 里，适合需要即时校验、联动、禁用提交和统一提交的数据；非受控表单让 DOM 保存值，配合 ref 或 FormData 读取，字段很多但不需要每次输入都触发 render 时更轻。文件输入通常只能非受控，不能把 File 放进普通文本 value。实际项目里我会按字段需要混用，但会保持一套清晰的提交和错误状态。

## 追问：校验应该什么时候发生？

必填和格式可以在 blur 或提交时校验，避免用户刚输入一个字符就被红字打断；密码强度或搜索联动可以按需即时反馈。服务端校验永远是最终边界，前端错误只帮助用户修正。提交状态要区分 idle、submitting、success 和 error，失败后保留输入并把焦点移到第一个错误。

## 追问：表单性能差时怎么查？

先用 Profiler 看是不是每次按键都让整张表重渲染，再按字段拆分订阅或使用非受控方案。不要一上来给所有输入套 memo；如果校验本身昂贵，可以防抖或放到 worker。最终仍要用真实字段数和低端设备测输入延迟。

