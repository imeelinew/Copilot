---
id: javascript-abort-controller
title: AbortController 取消 fetch 后 Promise 会怎样？
aliases: [取消 fetch, AbortSignal, 请求取消]
category: javascript
difficulty: 进阶
priority: high
projects: []
keywords: [AbortController, fetch, 取消, signal]
---

# AbortController 取消 fetch 后 Promise 会怎样？

## 核心回答

把 `controller.signal` 传给 fetch，调用 abort 后浏览器会尝试终止请求，fetch Promise 通常以 AbortError reject；这不是一个正常的业务成功，也不代表服务端一定没收到请求。catch 里要区分用户主动取消和真正的网络失败，前者一般不弹错误。组件卸载、关键词变化和超时都可以使用同一套取消信号。

## 追问：取消能解决旧响应覆盖吗？

能减少旧请求继续消耗资源，但不能保证所有环境都立刻停止，也不能替代结果校验。搜索场景我会同时维护请求序号或当前关键词，只有最新一轮才能提交结果。这样即使旧请求晚到或后端已经处理完，也不会污染页面。

## 追问：一个 signal 能复用多次吗？

不能把已经 aborted 的 signal 当成新请求的长期控制器；一旦 abort，它会一直是 aborted。每轮请求创建新的 controller，若需要一次取消多个并行请求，可以把同一个新 signal 传给它们，并在这一轮结束后丢弃 controller。

