# 협력업체 인력 관리 대시보드 — 설계 문서

**작성일**: 2026-04-12
**작성자**: QA 엔지니어 (HKMC / 셔클 플랫폼)
**목적**: 협력업체 인력 구성 및 일정을 한눈에 파악할 수 있는 웹 대시보드 제공

---

## 1. 개요

### 배경
협력업체 리소스 감축 지시에 대응하기 위해, 현재 인력 구성과 일정 현황을 시각적으로 보여주는 내부 대시보드를 구축한다.

### 대상 사용자
- **임원/경영진**: 인력 구성과 일정을 한눈에 파악
- **내부 다팀 (QA, 개발, PM)**: 담당자별 역할·서비스 참조

### 대시보드 구성
1. **일정** — Google Calendar 임베드
2. **인력 구성** — PL → 서비스 → TL → TE 트리 시각화

---

## 2. 기술 스택

| 항목 | 선택 |
|------|------|
| 프레임워크 | React + TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | Tailwind CSS |
| 트리 시각화 | 커스텀 React 컴포넌트 (CSS Flexbox) |
| 테스트 | Vitest + @testing-library/react |
| 배포 | 로컬 `npm run dev` 또는 GitHub Pages |

---

## 3. 페이지 구조

단일 스크롤 페이지. 위→아래 순서:

### 3-1. 헤더
- 타이틀: "협력업체 인력 관리"

### 3-2. 일정 섹션
- Google Calendar iframe 임베드
- Calendar ID: `9l2s17ql2ci7qfi9fu3nbekths@group.calendar.google.com`
- 임베드 URL:
  ```
  https://calendar.google.com/calendar/embed?src=9l2s17ql2ci7qfi9fu3nbekths%40group.calendar.google.com&ctz=Asia%2FSeoul&hl=ko
  ```
- 높이: 600px, 너비: 100%

### 3-3. 인력 구성 섹션
트리 구조: **PL → 서비스 → TL → TE**

```
PL: 이상필
├── [OP Tool / Map Tool]
│   └── TL: 조정호
│       ├── TE: 손윤수
│       └── TE: 정우원
├── [Rider]
│   └── TL: 이성형
│       ├── TE: 박건욱
│       ├── TE: 이형찬
│       ├── TE: 모건
│       ├── TE: 권오성
│       └── TE: 우영제
└── [Driver / Vehicle / Taxi / Kiosk]
    ├── TE: 이경근  (TL 없음)
    ├── TE: 이윤석
    └── TE: 심명섭
```

각 노드에 표시할 정보:
- **PL**: 이름, 역할 배지
- **서비스**: 서비스명 (배지)
- **TL**: 이름, 역할 배지
- **TE**: 이름, 역할 배지

---

## 4. 데이터

인력 데이터는 `src/data/orgData.ts`에 하드코딩. (Google Sheets CSV에서 초기값 추출 완료)

```typescript
// 원본 출처: Google Sheets gid=537843056
// https://docs.google.com/spreadsheets/d/10-QBEcWaHLF7xLaIzqUqtktH_XCYW164Gaa-AiAEhzo
```

데이터 구조:
```typescript
interface Person {
  name: string
  role: 'PL' | 'TL' | 'TE'
  experience: string   // 예: "5년", "신입"
}

interface ServiceGroup {
  serviceName: string
  tl: Person | null    // TL이 없는 서비스는 null
  tes: Person[]
}

interface OrgData {
  pl: Person
  services: ServiceGroup[]
}
```

---

## 5. 컴포넌트 구조

```
src/
├── App.tsx                   # 루트, 전체 레이아웃
├── index.css                 # Tailwind + @media print
├── data/
│   └── orgData.ts            # 인력 데이터 (하드코딩)
├── types/
│   └── org.ts                # Person, ServiceGroup, OrgData 타입
└── components/
    ├── Header.tsx             # 타이틀
    ├── CalendarSection.tsx    # Google Calendar iframe
    └── OrgTree.tsx            # 트리 시각화
```

---

## 6. 시각화 스타일 (노드 색상)

| 역할 | 배경 | 테두리 | 배지 색 |
|------|------|--------|--------|
| PL | slate-800 | blue-500 | blue |
| 서비스 | slate-800 | indigo-500 | indigo |
| TL | slate-800 | green-500 | green |
| TE | slate-800 | amber-500 | amber |
| TL 없음 표시 | slate-900 | slate-600 dashed | slate |

---

## 7. 인쇄/공유

- `@media print` CSS로 인쇄 시 레이아웃 유지
- 인쇄 시 iframe(캘린더)은 숨기고 "캘린더는 온라인에서 확인하세요" 안내 표시

---

## 8. 범위 외 항목 (이번 구현에서 제외)

- 로그인/인증
- Google Sheets 실시간 동기화
- Google Calendar API 연동 (iframe 임베드로 대체)
- 모바일 최적화
- 인력 데이터 편집 UI
