#!/usr/bin/env node
// Google Sheets → TypeScript 데이터 파일 자동 동기화 스크립트

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const config = JSON.parse(readFileSync(join(__dirname, 'sheet-config.json'), 'utf8'))

// 현재 월 키 (YYYY-MM)
const now = new Date()
const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

const monthConfig = config.months[monthKey]
if (!monthConfig) {
  console.log(`[sync] ${monthKey} 설정 없음. 건너뜀.`)
  process.exit(0)
}

// CSV 가져오기
const url = `https://docs.google.com/spreadsheets/d/${config.sheetId}/export?format=csv&gid=${monthConfig.gid}`
console.log(`[sync] fetch: ${url}`)

const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
if (!res.ok) {
  console.error(`[sync] fetch 실패: ${res.status} ${res.statusText}`)
  process.exit(1)
}
const csvText = await res.text()

// CSV 파싱 (따옴표 안의 줄바꿈 처리 포함)
function parseCSV(text) {
  const rows = []
  let row = [], cell = '', inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') { cell += '"'; i++ }
      else inQuotes = !inQuotes
    } else if (ch === ',' && !inQuotes) {
      row.push(cell); cell = ''
    } else if (ch === '\n' && !inQuotes) {
      row.push(cell); rows.push(row); row = []; cell = ''
    } else if (ch === '\r') {
      // skip
    } else {
      cell += ch
    }
  }
  if (row.length || cell) { row.push(cell); rows.push(row) }
  return rows
}

const allRows = parseCSV(csvText)

// Row 0: 총원 헤더  Row 1: NO/날짜 헤더
if (allRows.length < 2) {
  console.error('[sync] CSV 구조 오류')
  process.exit(1)
}

// 날짜 추출 (컬럼 5번부터)  "2026. 6. 1" → "2026-06-01"
const headerRow = allRows[1]
const dates = []
for (let i = 5; i < headerRow.length; i++) {
  const raw = headerRow[i].trim()
  const m = raw.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/)
  if (m) dates.push(`${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`)
}

if (dates.length === 0) {
  console.error('[sync] 날짜를 찾을 수 없음')
  process.exit(1)
}
console.log(`[sync] 날짜 ${dates.length}개: ${dates[0]} ~ ${dates[dates.length - 1]}`)

// 인원 시작 행 인덱스 수집 (col[4]에 이름이 있는 행)
// PL은 1행, 나머지는 마일스톤/앱/업무 3행 구조
const personStartRows = []
for (let i = 2; i < allRows.length; i++) {
  if ((allRows[i][4] || '').trim()) personStartRows.push(i)
}

// 인원별 데이터 추출
const persons = []
for (let p = 0; p < personStartRows.length; p++) {
  const si = personStartRows[p]
  const nextSi = personStartRows[p + 1] ?? allRows.length

  const r1 = allRows[si] || []
  const role = (r1[3] || '').trim()
  const name = (r1[4] || '').trim()

  if (role === 'PL') continue  // PL 제외

  // 앱행·업무행은 다음 인원 시작 전 행들 (없으면 빈 배열)
  const r2 = (si + 1 < nextSi ? allRows[si + 1] : null) || []
  const r3 = (si + 2 < nextSi ? allRows[si + 2] : null) || []

  const entries = dates.map((_, di) => {
    const col = di + 5
    return [
      (r1[col] || '').trim(),
      (r2[col] || '').trim(),
      (r3[col] || '').trim(),
    ]
  })

  persons.push({ name, entries })
}

console.log(`[sync] 인원 ${persons.length}명: ${persons.map(p => p.name).join(', ')}`)

// 날짜 기준 주(週) 그룹핑 (연속되지 않으면 새 그룹)
function groupByWeek(items) {
  const groups = [], cur = []
  items.forEach((item, idx) => {
    cur.push(item)
    const next = dates[idx + 1]
    const isLastOrGap = !next || (new Date(next) - new Date(dates[idx])) / 86400000 > 1
    if (isLastOrGap) { groups.push([...cur]); cur.length = 0 }
  })
  return groups
}

// TypeScript 파일 생성
const { exportName, datesVar, note } = monthConfig
const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

const datesLines = groupByWeek(dates).map(g => `  ${g.map(d => `'${d}'`).join(', ')},`)

const rawLines = []
for (const person of persons) {
  rawLines.push(`  { name: '${esc(person.name)}', entries: [`)
  for (const group of groupByWeek(person.entries)) {
    const cells = group.map(([m, a, t]) => `['${esc(m)}', '${esc(a)}', '${esc(t)}']`)
    rawLines.push(`    ${cells.join(', ')},`)
  }
  rawLines.push(`  ]},`)
}

const noteLine = note ? `// ${note}\n` : ''
const ts = [
  `import { aggregateDays } from '../utils/workAggregator'`,
  `import type { PersonRaw } from '../utils/workAggregator'`,
  ``,
  `${noteLine}export const ${datesVar} = [`,
  ...datesLines,
  `]`,
  ``,
  `// PL(이상필) 제외`,
  `const RAW: PersonRaw[] = [`,
  ...rawLines,
  `]`,
  ``,
  `export const ${exportName} = aggregateDays(${datesVar}, RAW)`,
  ``,
].join('\n')

// 변경사항 있을 때만 파일 쓰기
const outPath = join(ROOT, monthConfig.dataFile)
let existing = null
try { existing = readFileSync(outPath, 'utf8') } catch {}

if (existing === ts) {
  console.log('[sync] 변경사항 없음.')
} else {
  writeFileSync(outPath, ts, 'utf8')
  console.log(`[sync] 업데이트 완료: ${monthConfig.dataFile}`)
}
