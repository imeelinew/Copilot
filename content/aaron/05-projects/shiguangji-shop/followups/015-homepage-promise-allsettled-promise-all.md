---
id: shiguangji-shop-followup-015-homepage-promise-allsettled-promise-all
title: 首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？
aliases: [能具体解释一下首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await吗？, 从设计取舍看，首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？, 这个问题在项目中的实际边界是什么？]
category: shiguangji-shop
difficulty: 进阶
priority: high
projects: [拾光集移动商城系统]
keywords: [首页数据, Promise.allSettled, Promise.all, 加载状态]
---

# 首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await？

## 核心回答

轮播图、公告和推荐商品互相不依赖，所以可以同时请求。连续写三个 await 会让后一组等待前一组，整体时间容易累加；`Promise.all` 虽然也能并行，但任意一项拒绝后会直接进入失败分支，不方便保留其他成功区域。`Promise.allSettled` 会给出三项各自的结果，我可以分别处理，让公告失败时轮播和商品继续显示。

这里不只检查 Promise 是否 fulfilled，还检查接口的 `success` 和返回数据是不是数组，因为“请求正常结束”不等于“业务成功”，正常空数组也不能误报成异常。当前页面仍然等三组全部结算后统一赋值，重试也会重新请求三组；如果希望最快的数据先显示或者只重试失败区，还需要把各区域的 loading 和重试状态拆开。

## 回答要点

- 轮播图、公告和推荐商品互相不依赖，所以可以同时请求。
- 连续写三个 await 会让后一组等待前一组，整体时间容易累加；
- Promise.all 虽然也能并行，但任意一项拒绝后会直接进入失败分支，不方便保留其他成功区域。
- Promise.allSettled 会给出三项各自的结果，我可以分别处理，让公告失败时轮播和商品继续显示。

## 面试官可能追问

- 关于“首页为什么用 Promise.allSettled，不用 Promise.all 或三个 await”，为什么选择当前异步处理方式？
- 请求失败、重复触发或返回乱序时如何保证状态正确？
- 你会怎样测试慢请求和部分失败场景？

## 代码证据

> - [homeData.ts 第 13～41 行](/Users/aaron/personal-hub/apps/project-2/src/utils/homeData.ts:13)：并行结算、业务状态和数组结构检查。
> - [首页第 5～8 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:5)：失败区域和重试入口。
> - [首页第 185～205 行](/Users/aaron/personal-hub/apps/project-2/src/views/Home.vue:185)：统一赋值和 loading 收尾。
> - [首页测试第 25～53 行](/Users/aaron/personal-hub/apps/project-2/tests/home-data.test.ts:25)：已有异常与空数组场景；本轮未执行。
> - 原理参考：[MDN Promise.allSettled](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)。
