import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseAnswerSections, getAnswerContent } from '../src/answers.ts'
import { parseMarkdown } from '../src/question-bank.ts'

const root = resolve('content/default')
const filesUnder = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  if (entry.isDirectory()) return filesUnder(resolve(dir, entry.name))
  return entry.name.endsWith('.md') ? [resolve(dir, entry.name)] : []
})

const required = [
  '00-profile/behavioral-incident.md',
  '00-profile/behavioral-failure.md',
  '00-profile/behavioral-tradeoff.md',
  '00-profile/behavioral-conflict.md',
  '00-profile/behavioral-learning.md',
  '01-html-css/container-query.md',
  '01-html-css/focus-dialog.md',
  '02-javascript/execution-scope.md',
  '02-javascript/this-binding.md',
  '02-javascript/instanceof-prototype.md',
  '02-javascript/structured-clone.md',
  '02-javascript/microtask-render.md',
  '02-javascript/abort-controller.md',
  '02-javascript/conditional-infer.md',
  '03-frameworks/react/forms.md',
  '03-frameworks/react/server-state.md',
  '03-frameworks/react/hydration.md',
  '03-frameworks/vue/provide-inject.md',
  '03-frameworks/vue/rendering-list.md',
  '03-frameworks/vue/testing.md',
  '04-browser-network-engineering/indexeddb.md',
  '04-browser-network-engineering/file-upload.md',
  '04-browser-network-engineering/monitoring.md',
  '04-browser-network-engineering/cache-details.md',
  '04-browser-network-engineering/source-map-build.md',
  '04-browser-network-engineering/tree-shaking.md',
  '07-testing/test-strategy.md',
  '07-testing/async-request-test.md',
  '07-testing/e2e-behavior.md',
  '08-coding/debounce.md',
  '08-coding/promise-all.md',
  '08-coding/concurrency-pool.md',
  '08-coding/event-emitter.md',
  '08-coding/lru-cache.md',
  '08-coding/deep-clone.md',
  '08-coding/reactive-mini.md',
  '08-coding/throttle.md',
  '08-coding/array-object-utils.md',
  '08-coding/virtual-list.md',
  '09-system-design/search-suggestions.md',
  '09-system-design/dashboard.md',
  '09-system-design/chat-stream.md',
  '09-system-design/permission-menu.md',
  '09-system-design/modal-accessibility.md',
  '05-projects/mobile-shop/business-flow.md',
  '05-projects/mobile-shop/auth-request.md',
  '05-projects/mobile-shop/inventory-order.md',
  '05-projects/mobile-shop/recommendation-architecture.md',
  '05-projects/mobile-shop/security-xss.md',
  '05-projects/mobile-shop/deployment-recovery.md',
  '05-projects/mobile-shop/testing-limitations.md',
  '05-projects/datapilot/session-recovery.md',
  '05-projects/datapilot/failure-retry.md',
  '05-projects/datapilot/chart-editor-validation.md',
  '05-projects/datapilot/map-lifecycle.md',
  '05-projects/datapilot/ai-sse.md',
  '05-projects/datapilot/testing.md',
  '05-projects/datapilot/deployment-recovery.md',
  '05-projects/datapilot/tradeoffs.md',
  '05-projects/after-sales/data-visibility.md',
  '05-projects/after-sales/create-form.md',
  '05-projects/after-sales/audit-transaction.md',
  '05-projects/after-sales/auth-security.md',
  '05-projects/after-sales/frontend-state.md',
  '05-projects/after-sales/testing-boundaries.md',
  '05-projects/after-sales/deployment-recovery.md',
  '05-projects/after-sales/tradeoffs.md',
]

test('plan coverage documents exist and have natural, answered structures', () => {
  const all = new Set(filesUnder(root).map((file) => file.slice(root.length + 1).replaceAll('\\', '/')))
  for (const name of required) {
    assert.ok(all.has(name), `计划要求的题目缺失：${name}`)
    const file = resolve(root, name)
    const raw = readFileSync(file, 'utf8')
    const question = parseMarkdown(`default/${name}`, raw)
    const content = getAnswerContent({ sections: question.sections })
    assert.ok(content.core.trim(), `缺少核心回答：${name}`)
    assert.ok(content.followups.length >= 2, `追问不足：${name}`)
    assert.ok(content.followups.every((item) => item.answer.trim().length >= 30), `追问回答过短：${name}`)
    assert.doesNotMatch(raw, /必说|加分项|报菜名|一句话总结|面试官想听/)
  }
})

test('new generic documents have no project ownership markers', () => {
  const projectBacked = new Set([
    '00-profile/behavioral-incident.md',
    '00-profile/behavioral-failure.md',
    '00-profile/behavioral-tradeoff.md',
  ])
  for (const name of required.filter((item) => !item.startsWith('05-projects/') && !projectBacked.has(item))) {
    const question = parseMarkdown(`default/${name}`, readFileSync(resolve(root, name), 'utf8'))
    assert.deepEqual(question.projects, [], name)
  }
})

test('new project documents stay inside their declared project', () => {
  const projects = {
    '05-projects/mobile-shop/': '轻购',
    '05-projects/datapilot/': '城市视图',
    '05-projects/after-sales/': '智服工单',
  }
  for (const name of required.filter((item) => item.startsWith('05-projects/'))) {
    const question = parseMarkdown(`default/${name}`, readFileSync(resolve(root, name), 'utf8'))
    const expected = Object.entries(projects).find(([prefix]) => name.startsWith(prefix))?.[1]
    assert.deepEqual(question.projects, [expected], name)
  }
})
