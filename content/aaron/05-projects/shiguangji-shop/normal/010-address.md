---
id: shiguangji-shop-normal-010-address
title: 地址管理
aliases: [请介绍一下项目中的地址管理。, 你在地址管理方面具体做了什么？, 这部分的设计思路和边界是什么？]
category: shiguangji-shop
difficulty: 基础
priority: normal
projects: [拾光集移动商城系统]
keywords: [地址管理, 订单流程, sessionStorage, 服务端计价]
---

# 地址管理

## 核心回答

地址模块支持收货地址的新增、编辑、删除和默认地址设置。用户保存地址时，页面先拿到省、市、区的文字，再逐级查询对应的地区 ID，最后转换成接口需要的数据格式。直辖市会出现省市名称相同的情况，所以代码针对这种情况匹配后端使用的“市辖区”层级。

地址页还有一个订单选择模式。用户从确认订单页进入地址列表时，页面优先选中本次订单已经保存的地址；如果没有，再使用默认地址或者第一条地址。用户选择后，只把 addrId 写回当前订单的 sessionStorage 数据，再返回订单确认页重新请求价格和地址。这样“本次订单选择哪个地址”和“账户的默认地址”是两个不同操作，不会因为临时选址就自动修改用户的默认设置。

## 回答要点

- 地址模块支持收货地址的新增、编辑、删除和默认地址设置。
- 用户保存地址时，页面先拿到省、市、区的文字，再逐级查询对应的地区 ID，最后转换成接口需要的数据格式。
- 直辖市会出现省市名称相同的情况，所以代码针对这种情况匹配后端使用的“市辖区”层级。
- 地址页还有一个订单选择模式。

## 面试官可能追问

- 关于“地址管理”，核心业务状态由谁维护？
- 库存、价格或接口结果变化时如何避免提交错误数据？
- 这个流程最需要覆盖哪些异常和边界条件？

## 代码证据

> - [地址页第 168～201 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:168)：列表加载、本次订单地址和默认地址的选择顺序。
> - [地址页第 208～243 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:208)：直辖市处理、逐级地区 ID 查询和新增地址。
> - [地址页第 259～317 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:259)：编辑回填、更新地址和设置默认地址。
> - [地址页第 374～386 行](/Users/aaron/personal-hub/apps/project-2/src/views/Address.vue:374)：订单模式下把 addrId 写回本次结算数据。
> - [确认订单第 120～158 行](/Users/aaron/personal-hub/apps/project-2/src/views/Order.vue:120)：读取当前结算参数并重新获取地址和金额。
