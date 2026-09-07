---
id: datapilot-ai-sse
title: 城市视图 AI 聊天的流式解析怎样保证不丢字？
aliases: [城市视图 SSE, AIChat 流式, TextDecoder buffer]
category: datapilot
difficulty: 进阶
priority: high
projects: [城市视图]
keywords: [SSE, TextDecoder, reader, thinking, fallback]
---

# 城市视图 AI 聊天的流式解析怎样保证不丢字？

## 核心回答

AIChat 通过 `response.body.getReader()` 读取字节，用 TextDecoder 解码后把本次 chunk 追加到 buffer，按 `\n\n` 拆事件，剩余半条留到下一次再拼。事件里的 text 增量追加到当前助手消息，thinking 和 fallback 按类型更新状态。发送前先保存用户消息，结束后再把完整回答落到会话；断网、服务端错误和取消都要留下可恢复的状态，不能把连接关闭直接当成成功。

## 追问：当前实现有什么边界？

我核对到前端已经处理了分片 buffer、text、fallback 和 thinking，但没有看到明确的 AbortController 和 `[DONE]` 结束处理。面试时我会把这说成当前边界，并建议补事件序号、显式 done、取消按钮和半截消息状态。否则重复发送或中途断网时，可能出现重复内容、一直 loading 或误标成功。

## 追问：thinking 内容要不要直接展示？

要先和产品约定。模型内部思考或供应商调试字段可能包含不该暴露的提示和隐私，默认只展示用户需要的进度摘要，不把原始 reasoning 当聊天正文。服务端也要过滤事件类型，前端只渲染允许展示的字段，避免把内部信息或未清洗 Markdown 当 HTML 插进去。

