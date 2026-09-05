---
id: after-sales-state-machine
title: 工单状态机和并发冲突是怎么处理的？
aliases: [工单状态流转, 防止越级流转, 乐观锁, version并发, 状态机]
category: after-sales
difficulty: 亮点
priority: high
projects: [智服工单]
keywords: [状态机, 事务, 乐观并发, FOR UPDATE, version]
---

# 工单状态机和并发冲突是怎么处理的？

## 30 秒回答

我把每个工单状态允许进入的下一状态，以及不同角色允许执行的动作都定义成明确规则。服务端更新时在事务中锁定工单，校验当前状态和角色，再使用 version 和原状态作为更新条件。如果 affectedRows 为零，说明数据已被其他人修改，返回 409 要求刷新，避免重复提交和越级流转。

## 标准回答

智服工单不是让前端随意提交一个新状态，而是把流程建模为状态机。比如待处理只能进入处理中或取消，处理中可以提交到待回访，待回访可以完成或退回处理。角色也有独立限制，工程师不能直接完成或取消工单。

前端根据“角色加当前状态”计算可展示的按钮，减少误操作；服务端收到请求后再次校验合法状态和角色，不能依赖前端。

为了处理两个人同时操作同一工单，更新过程放在数据库事务中，先读取当前状态和 version，再执行带 version 和原状态条件的 UPDATE，同时把 version 加一。如果 affectedRows 为零，说明读取之后数据已发生变化，接口返回 409，提示刷新重试。状态更新和操作记录写入同一事务，任何一步失败都会回滚，保证工单状态和时间线一致。

## 深入回答

这里同时使用行锁和版本条件。FOR UPDATE 可以在事务期间串行化对同一行的写操作；version 与原状态条件则明确检测陈旧数据，避免后一个请求基于过期页面状态静默覆盖最新结果。

即使前端禁用按钮也无法解决多标签页、多用户或请求重试造成的并发，因此一致性必须在服务端和数据库层保证。

## 回答要点

- 状态合法性和角色合法性是两次不同校验。
- 前端限制交互，服务端保证安全。
- 状态和操作记录必须在同一事务中。
- 409 表示并发冲突，需要刷新后重新决策。

## 面试官可能追问

- 只在前端禁用按钮为什么不够？
- FOR UPDATE 和乐观锁是否重复？
- 为什么不能直接以最后一次写入为准？

## 代码证据

- /Users/eli/Resumes/after-sales-work-order/server/src/services/ticketState.js
- /Users/eli/Resumes/after-sales-work-order/server/src/controllers/tickets.js
- /Users/eli/Resumes/after-sales-work-order/server/test/ticketState.test.js
