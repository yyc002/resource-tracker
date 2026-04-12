# 협력업체 인력 관리 대시보드 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Google Calendar 일정 임베드 + PL→서비스→TL→TE 인력 트리를 보여주는 React + TypeScript 단일 페이지 대시보드를 `tuyy/resource-tracker/`에 구축한다.

**Architecture:** Vite로 부트스트랩한 React SPA. 인력 데이터는 `src/data/orgData.ts`에 하드코딩. 캘린더는 Google Calendar iframe으로 임베드. 트리는 커스텀 CSS Flexbox 컴포넌트로 렌더링.

**Tech Stack:** React 18, TypeScript 5, Vite 5, Tailwind CSS 3, Vitest, @testing-library/react

---

## 파일 구조

```
tuyy/resource-tracker/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css                  # Tailwind + @media print
│   ├── test-setup.ts
│   ├── types/
│   │   └── org.ts                 # Person, ServiceGroup, OrgData
│   ├── data/
│   │   └── orgData.ts             # 인력 데이터 하드코딩
│   └── components/
│       ├── Header.tsx
│       ├── Header.test.tsx
│       ├── CalendarSection.tsx
│       ├── CalendarSection.test.tsx
│       ├── OrgTree.tsx
│       └── OrgTree.test.tsx
└── docs/
    └── superpowers/
        ├── specs/2026-04-12-vendor-resource-dashboard-design.md
        └── plans/2026-04-12-vendor-resource-dashboard.md
```

---

## Task 1: 프로젝트 스캐폴딩

**Files:**
- Create: `tuyy/resource-tracker/` (전체 디렉터리)
- Modify: `vite.config.ts`, `tsconfig.json`, `tailwind.config.js`, `src/index.css`, `src/test-setup.ts`

- [ ] **Step 1: Vite 프로젝트 생성**

```bash
cd /Users/hmc123/tuyy
npm create vite@latest resource-tracker -- --template react-ts
cd resource-tracker
```

- [ ] **Step 2: 의존성 설치**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer \
  vitest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom
```

- [ ] **Step 3: Tailwind 초기화**

```bash
npx tailwindcss init -p
```

- [ ] **Step 4: `tailwind.config.js` 수정**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

- [ ] **Step 5: `vite.config.ts` 수정**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

- [ ] **Step 6: `tsconfig.json` 수정**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 7: `src/test-setup.ts` 생성**

```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 8: `src/index.css` 교체**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@media print {
  body {
    background: white !important;
    color: #0f172a !important;
  }
  .print-hidden {
    display: none !important;
  }
  .print-visible {
    display: block !important;
  }
}
```

- [ ] **Step 9: 불필요한 기본 파일 삭제**

```bash
rm src/assets/react.svg public/vite.svg src/App.css
```

- [ ] **Step 10: 개발 서버 확인**

`src/App.tsx`를 임시 내용으로 교체:

```tsx
export default function App() {
  return <div className="p-4 text-white bg-slate-900 min-h-screen">준비중</div>
}
```

```bash
npm run dev
```

`http://localhost:5173` 에서 "준비중" 표시 확인.

```bash
npm run test -- --run
```

Expected: 오류 없이 종료 (테스트 파일 없음)

- [ ] **Step 11: 커밋**

```bash
git init
git add .
git commit -m "feat: 프로젝트 초기 설정 (Vite + React + TS + Tailwind + Vitest)"
```

---

## Task 2: 타입 정의

**Files:**
- Create: `src/types/org.ts`

- [ ] **Step 1: `src/types/org.ts` 생성**

```ts
export type Role = 'PL' | 'TL' | 'TE'

export interface Person {
  name: string
  role: Role
  experience: string  // 예: "5년", "신입", "13년"
}

export interface ServiceGroup {
  serviceName: string   // 예: "OP Tool / Map Tool"
  tl: Person | null     // TL이 없는 서비스는 null
  tes: Person[]
}

export interface OrgData {
  pl: Person
  services: ServiceGroup[]
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/types/org.ts
git commit -m "feat: 조직 구조 타입 정의"
```

---

## Task 3: 인력 데이터

**Files:**
- Create: `src/data/orgData.ts`

- [ ] **Step 1: `src/data/orgData.ts` 생성**

```ts
// 원본 출처: Google Sheets (gid=537843056)
// https://docs.google.com/spreadsheets/d/10-QBEcWaHLF7xLaIzqUqtktH_XCYW164Gaa-AiAEhzo
import type { OrgData } from '../types/org'

export const orgData: OrgData = {
  pl: { name: '이상필', role: 'PL', experience: '13년' },
  services: [
    {
      serviceName: 'OP Tool / Map Tool',
      tl: { name: '조정호', role: 'TL', experience: '5년' },
      tes: [
        { name: '손윤수', role: 'TE', experience: '3년' },
        { name: '정우원', role: 'TE', experience: '2년' },
      ],
    },
    {
      serviceName: 'Rider',
      tl: { name: '이성형', role: 'TL', experience: '5년' },
      tes: [
        { name: '박건욱', role: 'TE', experience: '1년' },
        { name: '이형찬', role: 'TE', experience: '신입' },
        { name: '모건',   role: 'TE', experience: '신입' },
        { name: '권오성', role: 'TE', experience: '신입' },
        { name: '우영제', role: 'TE', experience: '1년' },
      ],
    },
    {
      serviceName: 'Driver / Vehicle / Taxi / Kiosk',
      tl: null,
      tes: [
        { name: '이경근', role: 'TE', experience: '6년' },
        { name: '이윤석', role: 'TE', experience: '4년' },
        { name: '심명섭', role: 'TE', experience: '8년' },
      ],
    },
  ],
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/data/orgData.ts
git commit -m "feat: 인력 데이터 초기값 (Google Sheets 기반)"
```

---

## Task 4: Header 컴포넌트

**Files:**
- Create: `src/components/Header.tsx`
- Create: `src/components/Header.test.tsx`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/components/Header.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('대시보드 타이틀을 렌더링한다', () => {
    render(<Header />)
    expect(screen.getByText('협력업체 인력 관리')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npm run test -- --run src/components/Header.test.tsx
```

Expected: FAIL — `Cannot find module './Header'`

- [ ] **Step 3: `src/components/Header.tsx` 구현**

```tsx
export default function Header() {
  return (
    <header className="px-6 py-5 bg-slate-800 border-b border-slate-700">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        협력업체 인력 관리
      </h1>
    </header>
  )
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npm run test -- --run src/components/Header.test.tsx
```

Expected: PASS

- [ ] **Step 5: 커밋**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git commit -m "feat: Header 컴포넌트"
```

---

## Task 5: CalendarSection 컴포넌트

**Files:**
- Create: `src/components/CalendarSection.tsx`
- Create: `src/components/CalendarSection.test.tsx`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/components/CalendarSection.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalendarSection from './CalendarSection'

describe('CalendarSection', () => {
  it('섹션 제목을 렌더링한다', () => {
    render(<CalendarSection />)
    expect(screen.getByText('일정')).toBeInTheDocument()
  })

  it('Google Calendar iframe을 렌더링한다', () => {
    render(<CalendarSection />)
    const iframe = document.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.src).toContain('calendar.google.com')
  })

  it('인쇄 시 안내 문구가 있다', () => {
    render(<CalendarSection />)
    expect(screen.getByText(/온라인에서 확인/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npm run test -- --run src/components/CalendarSection.test.tsx
```

Expected: FAIL

- [ ] **Step 3: `src/components/CalendarSection.tsx` 구현**

```tsx
const CALENDAR_SRC =
  'https://calendar.google.com/calendar/embed' +
  '?src=9l2s17ql2ci7qfi9fu3nbekths%40group.calendar.google.com' +
  '&ctz=Asia%2FSeoul' +
  '&hl=ko'

export default function CalendarSection() {
  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        일정
      </h2>
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {/* 화면 표시 */}
        <iframe
          src={CALENDAR_SRC}
          className="w-full print-hidden"
          style={{ height: 600, border: 0 }}
          title="팀 캘린더"
        />
        {/* 인쇄 시 대체 문구 */}
        <p className="hidden print-visible text-slate-500 text-sm p-4">
          일정은 온라인에서 확인하세요: calendar.google.com
        </p>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npm run test -- --run src/components/CalendarSection.test.tsx
```

Expected: PASS (3개)

- [ ] **Step 5: 커밋**

```bash
git add src/components/CalendarSection.tsx src/components/CalendarSection.test.tsx
git commit -m "feat: CalendarSection 컴포넌트 (Google Calendar iframe)"
```

---

## Task 6: OrgTree 컴포넌트

**Files:**
- Create: `src/components/OrgTree.tsx`
- Create: `src/components/OrgTree.test.tsx`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/components/OrgTree.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OrgTree from './OrgTree'
import type { OrgData } from '../types/org'

const testData: OrgData = {
  pl: { name: '홍길동', role: 'PL', experience: '10년' },
  services: [
    {
      serviceName: 'Test Service',
      tl: { name: '김TL', role: 'TL', experience: '5년' },
      tes: [
        { name: '이TE', role: 'TE', experience: '2년' },
        { name: '박TE', role: 'TE', experience: '1년' },
      ],
    },
    {
      serviceName: 'No TL Service',
      tl: null,
      tes: [
        { name: '최TE', role: 'TE', experience: '3년' },
      ],
    },
  ],
}

describe('OrgTree', () => {
  it('PL 이름을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('홍길동')).toBeInTheDocument()
  })

  it('서비스명을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('No TL Service')).toBeInTheDocument()
  })

  it('TL 이름을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('김TL')).toBeInTheDocument()
  })

  it('TE 이름을 모두 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('이TE')).toBeInTheDocument()
    expect(screen.getByText('박TE')).toBeInTheDocument()
    expect(screen.getByText('최TE')).toBeInTheDocument()
  })

  it('TL이 없는 서비스에서 TL없음 표시를 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('TL 없음')).toBeInTheDocument()
  })

  it('역할 배지를 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('PL')).toBeInTheDocument()
    expect(screen.getByText('TL')).toBeInTheDocument()
    // TE 배지 여러 개
    expect(screen.getAllByText('TE').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: 테스트 실행 — 실패 확인**

```bash
npm run test -- --run src/components/OrgTree.test.tsx
```

Expected: FAIL

- [ ] **Step 3: `src/components/OrgTree.tsx` 구현**

```tsx
import type { OrgData, Person, ServiceGroup } from '../types/org'

interface OrgTreeProps {
  data: OrgData
}

const roleBadgeClass: Record<string, string> = {
  PL: 'bg-blue-900 text-blue-300 border border-blue-600',
  TL: 'bg-green-900 text-green-300 border border-green-600',
  TE: 'bg-amber-900 text-amber-300 border border-amber-600',
}

const nodeBoxClass: Record<string, string> = {
  PL: 'border-blue-500',
  TL: 'border-green-500',
  TE: 'border-amber-500',
}

function Badge({ role }: { role: string }) {
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${roleBadgeClass[role] ?? ''}`}>
      {role}
    </span>
  )
}

function PersonNode({ person }: { person: Person }) {
  return (
    <div
      className={`bg-slate-800 border-2 ${nodeBoxClass[person.role] ?? 'border-slate-600'} rounded-lg px-4 py-2 flex flex-col items-center gap-1 min-w-[90px]`}
    >
      <Badge role={person.role} />
      <span className="text-white font-semibold text-sm">{person.name}</span>
      <span className="text-slate-500 text-xs">{person.experience}</span>
    </div>
  )
}

function Connector() {
  return <div className="w-px h-5 bg-slate-600 mx-auto" />
}

function HorizontalLine() {
  return <div className="h-px bg-slate-600 w-full" />
}

function ServiceNode({ service }: { service: ServiceGroup }) {
  return (
    <div className="flex flex-col items-center">
      {/* 서비스 노드 */}
      <div className="bg-slate-800 border-2 border-indigo-500 rounded-lg px-4 py-2 text-center min-w-[140px]">
        <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-900 text-indigo-300 border border-indigo-600 font-mono">
          SERVICE
        </span>
        <p className="text-white font-semibold text-sm mt-1">{service.serviceName}</p>
      </div>

      <Connector />

      {/* TL 또는 TL없음 */}
      {service.tl ? (
        <>
          <PersonNode person={service.tl} />
          <Connector />
        </>
      ) : (
        <>
          <div className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg px-4 py-2 text-center min-w-[90px]">
            <span className="text-slate-500 text-xs">TL 없음</span>
          </div>
          <Connector />
        </>
      )}

      {/* TE 목록 */}
      <div className="flex flex-col gap-2 items-center">
        {service.tes.map((te) => (
          <PersonNode key={te.name} person={te} />
        ))}
      </div>
    </div>
  )
}

export default function OrgTree({ data }: OrgTreeProps) {
  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
        인력 구성
      </h2>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 overflow-x-auto">
        <div className="flex flex-col items-center min-w-max mx-auto">

          {/* PL */}
          <PersonNode person={data.pl} />
          <Connector />

          {/* PL → 서비스 가로 연결선 */}
          <div className="flex items-start w-full justify-center">
            <div className="flex flex-col w-full">
              <HorizontalLine />
              <div className="flex justify-around pt-0">
                {data.services.map((svc) => (
                  <div key={svc.serviceName} className="flex flex-col items-center">
                    <Connector />
                    <ServiceNode service={svc} />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 범례 */}
        <div className="flex gap-4 mt-6 pt-4 border-t border-slate-700 justify-center flex-wrap">
          {(['PL', 'SERVICE', 'TL', 'TE'] as const).map((r) => (
            <div key={r} className="flex items-center gap-1.5 text-xs text-slate-400">
              <div className={`w-3 h-3 rounded border-2 ${
                r === 'PL' ? 'border-blue-500' :
                r === 'SERVICE' ? 'border-indigo-500' :
                r === 'TL' ? 'border-green-500' : 'border-amber-500'
              }`} />
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: 테스트 실행 — 통과 확인**

```bash
npm run test -- --run src/components/OrgTree.test.tsx
```

Expected: PASS (6개)

- [ ] **Step 5: 커밋**

```bash
git add src/components/OrgTree.tsx src/components/OrgTree.test.tsx
git commit -m "feat: OrgTree 컴포넌트 (PL→서비스→TL→TE 트리)"
```

---

## Task 7: App.tsx 조립

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: `src/App.tsx` 완성**

```tsx
import Header from './components/Header'
import CalendarSection from './components/CalendarSection'
import OrgTree from './components/OrgTree'
import { orgData } from './data/orgData'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        <CalendarSection />
        <OrgTree data={orgData} />
      </main>
    </div>
  )
}
```

- [ ] **Step 2: 전체 테스트 실행 — 모두 통과 확인**

```bash
npm run test -- --run
```

Expected: 모든 테스트 PASS

- [ ] **Step 3: 개발 서버에서 수동 검증**

```bash
npm run dev
```

`http://localhost:5173` 에서 확인:
1. "협력업체 인력 관리" 타이틀 표시
2. Google Calendar 캘린더 로드
3. 트리: 이상필(PL) → 3개 서비스 → TL/TE 노드 표시
4. Driver/Vehicle/Taxi/Kiosk 서비스에 "TL 없음" 노드 표시

- [ ] **Step 4: 최종 커밋**

```bash
git add src/App.tsx
git commit -m "feat: App.tsx 조립 완성 — 협력업체 인력 관리 대시보드"
```

---

## 완료 기준

- [ ] `npm run test -- --run` 전체 통과
- [ ] 브라우저에서 캘린더 iframe 정상 로드
- [ ] 트리에서 전체 인원(이상필, 조정호, 이성형, 손윤수, 정우원, 박건욱, 이형찬, 모건, 권오성, 우영제, 이경근, 이윤석, 심명섭) 표시
- [ ] Driver/Vehicle/Taxi/Kiosk 서비스에 "TL 없음" 노드 표시
