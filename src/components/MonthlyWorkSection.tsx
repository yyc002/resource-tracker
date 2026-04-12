import { FEB_AGGREGATED } from '../data/feb2026'
import type { AggregatedDay } from '../types/work'

// 2월 주별 배열 (Mon-Fri × 4주)
// 인덱스는 FEB_AGGREGATED 기준 (0=2/2 ... 19=2/27)
const WEEKS = [
  [0, 1, 2, 3, 4],    // 2/2~2/6
  [5, 6, 7, 8, 9],    // 2/9~2/13
  [10, 11, 12, 13, 14], // 2/16~2/20 (10~12 설날)
  [15, 16, 17, 18, 19], // 2/23~2/27
]

const DAY_LABELS = ['월', '화', '수', '목', '금']

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function formatMd(md: number): string {
  return md % 1 === 0 ? `${md}MD` : `${md}MD`
}

function DayCell({ day }: { day: AggregatedDay }) {
  if (day.isHoliday) {
    return (
      <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-3 min-h-[80px] flex flex-col">
        <span className="text-xs font-bold text-slate-500">{formatDate(day.date)}</span>
        <span className="mt-2 text-xs text-amber-400/70 font-medium">{day.holidayLabel}</span>
      </div>
    )
  }

  const isEmpty = day.milestones.length === 0 && day.standalone.length === 0
  if (isEmpty) {
    return (
      <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-3 min-h-[80px]">
        <span className="text-xs font-bold text-slate-500">{formatDate(day.date)}</span>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs space-y-2">
      <span className="font-bold text-slate-300">{formatDate(day.date)}</span>

      {/* 마일스톤 그룹 */}
      {day.milestones.map((mg) => (
        <div key={mg.milestone}>
          <div className="font-semibold text-indigo-300 mb-0.5">{mg.milestone}</div>
          {mg.services.map((sw) => (
            <div key={`${sw.service}-${sw.task}`} className="flex items-baseline gap-1 pl-2">
              <span className="text-slate-400">{sw.service}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 flex-1">{sw.task}</span>
              <span className="font-mono text-emerald-400 flex-none">{formatMd(sw.md)}</span>
            </div>
          ))}
        </div>
      ))}

      {/* 독립 업무 */}
      {day.standalone.map((s) => (
        <div key={s.label} className="flex items-baseline gap-1">
          <span className="text-slate-300 flex-1">{s.label}</span>
          <span className="font-mono text-emerald-400 flex-none">{formatMd(s.md)}</span>
        </div>
      ))}
    </div>
  )
}

export default function MonthlyWorkSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-300 mb-4">월별 업무현황 (2월)</h2>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-slate-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* 주별 행 */}
        <div className="space-y-2">
          {WEEKS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-5 gap-2">
              {week.map((dayIdx) => (
                <DayCell key={dayIdx} day={FEB_AGGREGATED[dayIdx]} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
