import { useState } from 'react'
import { ALL_DATA_BY_DATE, WORK_MONTHS } from '../data/workIndex'
import type { AggregatedDay } from '../types/work'

const DAY_LABELS = ['월', '화', '수', '목', '금']

// 데이터 있는 첫 번째 달로 초기화
const INITIAL_YEAR = WORK_MONTHS[WORK_MONTHS.length - 1].year
const INITIAL_MONTH = WORK_MONTHS[WORK_MONTHS.length - 1].month

function toDateStr(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function formatMd(md: number): string {
  return `${md}MD`
}

// ── 셀 컴포넌트들 ────────────────────────────────────

function EmptyPad() {
  return <div className="min-h-[80px]" />
}


function HolidayCell({ day, label }: { day: number; label?: string }) {
  return (
    <div className="min-h-[80px] rounded-lg bg-slate-800/40 border border-slate-700 p-2">
      <span className="text-xs font-bold text-slate-500">{day}</span>
      <p className="mt-1 text-xs text-amber-400/80">{label ?? '휴일'}</p>
    </div>
  )
}

function NoDataCell({ day }: { day: number }) {
  return (
    <div className="min-h-[80px] rounded-lg bg-slate-800/40 border border-slate-700 p-2">
      <span className="text-xs font-bold text-slate-500">{day}</span>
    </div>
  )
}

function WorkCell({ day, data }: { day: number; data: AggregatedDay }) {
  return (
    <div className="min-h-[80px] rounded-lg bg-slate-800 border border-slate-700 p-2 text-xs space-y-1.5">
      <span className="font-bold text-slate-300">{day}</span>

      {data.milestones.map((mg) => (
        <div key={mg.milestone}>
          <div className="font-semibold text-indigo-300">{mg.milestone}</div>
          {mg.services.map((sw) => (
            <div key={`${sw.service}-${sw.task}`} className="flex items-baseline gap-1 pl-1.5">
              <span className="text-slate-400 truncate flex-1">
                {sw.service} &gt; {sw.task}
              </span>
              <span className="font-mono text-emerald-400 flex-none">{formatMd(sw.md)}</span>
            </div>
          ))}
        </div>
      ))}

      {data.standalone.map((s) => (
        <div key={s.label} className="flex items-baseline gap-1">
          <span className="text-slate-300 flex-1 break-keep">{s.label}</span>
          <span className="font-mono text-emerald-400 flex-none">{formatMd(s.md)}</span>
        </div>
      ))}

      {/* OFF (휴무/반차) */}
      {data.offMd > 0 && (
        <div className="flex items-baseline gap-1 pt-0.5 border-t border-slate-700">
          <span className="text-slate-400 flex-1">OFF</span>
          <span className="font-mono text-rose-400 flex-none">{formatMd(data.offMd)}</span>
        </div>
      )}
    </div>
  )
}

// ── 캘린더 생성 ──────────────────────────────────────

// 토·일 제외, 월~금 5열 캘린더 생성
function buildCalendar(year: number, month: number): (number | null)[][] {
  const firstDow = new Date(year, month - 1, 1).getDay() // 0=일..6=토
  const daysInMonth = new Date(year, month, 0).getDate()

  // 첫날이 화~금이면 앞에 null 패딩 (월 컬럼부터 시작하도록)
  const pad = firstDow >= 2 && firstDow <= 5 ? firstDow - 1 : 0
  const cells: (number | null)[] = Array<null>(pad).fill(null)

  for (let d = 1; d <= daysInMonth; d++) {
    const dow = new Date(year, month - 1, d).getDay()
    if (dow >= 1 && dow <= 5) cells.push(d) // 월~금만 추가
  }
  while (cells.length % 5 !== 0) cells.push(null)

  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 5) weeks.push(cells.slice(i, i + 5))
  return weeks
}

// ── 메인 컴포넌트 ────────────────────────────────────

export default function MonthlyWorkSection() {
  const [year, setYear] = useState(INITIAL_YEAR)
  const [month, setMonth] = useState(INITIAL_MONTH)

  const weeks = buildCalendar(year, month)

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  return (
    <section>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-300">월별 업무현황</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={prevMonth}
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm"
          >
            ← 이전
          </button>
          <span className="text-slate-400 text-sm">{year}년 {month}월</span>
          <button
            onClick={nextMonth}
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm"
          >
            다음 →
          </button>
        </div>
      </div>

      {/* 캘린더 */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-5 gap-1.5 mb-1.5">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-semibold py-1 text-slate-500">
              {d}
            </div>
          ))}
        </div>

        {/* 주별 행 */}
        <div className="space-y-1.5">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-5 gap-1.5">
              {week.map((day, di) => {
                if (day === null) return <EmptyPad key={di} />

                const dateStr = toDateStr(year, month, day)
                const data = ALL_DATA_BY_DATE.get(dateStr)

                if (!data) return <NoDataCell key={di} day={day} />
                if (data.isHoliday) return <HolidayCell key={di} day={day} label={data.holidayLabel} />
                return <WorkCell key={di} day={day} data={data} />
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
