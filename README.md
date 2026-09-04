# 面试话术库

面向前端实习面试的本地优先回答检索工具。问题和答案使用 Markdown 管理，浏览器内完成即时搜索；题库没有可靠答案时，可以调用可配置的 Agent 接口生成一次性回答。

## 开发

```bash
npm install
npm run dev
```

## 内容格式

题库位于 `content/`。每道问题对应一个 Markdown 文件，主要字段包括：

- `title`：标准问题
- `aliases`：面试官可能采用的其他问法
- `category`：所属分类
- `projects`：关联项目
- `keywords`：用于召回的关键词
- `priority`：是否优先复习

正文支持 `30 秒回答`、`标准回答`、`深入回答`、`回答要点`、`面试官可能追问` 和 `代码证据`。

## Agent fallback

前端默认向 `/api/answer` 发送请求，也可以通过环境变量设置服务地址：

```bash
VITE_AGENT_ENDPOINT=http://127.0.0.1:3000/api/answer
```

请求体：

```json
{ "question": "用户没有在题库中找到的问题" }
```

响应体：

```json
{ "answer": "一次性展示的口语回答" }
```

Agent 结果不会写回 Markdown 题库。

## 质量检查

```bash
npm run build
```
