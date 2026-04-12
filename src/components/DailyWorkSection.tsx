import { dailyStats } from '../data/dailyStats'

const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

function formatKoreanDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dow = DAY_OF_WEEK[date.getDay()]
  return `${year}년 ${month}월 ${day}일(${dow})`
}

const METRICS = [
  { emoji: '✍🏻', label: 'TC 작성 수',      value: dailyStats.tcWritten },
  { emoji: '▶️', label: 'TC 수행 수',      value: dailyStats.tcExecuted },
  { emoji: '🐛', label: '이슈등록 수',     value: dailyStats.issuesRegistered },
  { emoji: '🔧', label: '잔여 이슈처리 수', value: dailyStats.issuesResolved },
]

export default function DailyWorkSection() {
  const today = formatKoreanDate(new Date())

  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-300 mb-4">일별 업무현황</h2>
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
        <p className="text-base font-semibold text-slate-200 mb-4">{today}</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {METRICS.map(({ emoji, label, value }) => (
            <div
              key={label}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 flex items-center gap-4"
            >
              <span className="text-4xl leading-none">{emoji}</span>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">{label}</p>
                <p className="text-2xl font-bold text-sky-400">
                  {value}<span className="text-sm font-normal text-slate-400 ml-1">개</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
