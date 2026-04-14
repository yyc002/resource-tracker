import { useState } from 'react'

const MILESTONES = ['4.9', '4.9.5', '4.10'] as const
type Milestone = typeof MILESTONES[number]

export default function MilestoneSection() {
  const [selected, setSelected] = useState<Milestone>('4.10')

  return (
    <section>
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-slate-300">마일스톤 별 기여도</h2>
        <div className="flex items-center gap-1.5">
          {MILESTONES.map((ms) => (
            <button
              key={ms}
              onClick={() => setSelected(ms)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selected === ms
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {ms}
            </button>
          ))}
        </div>
      </div>

      {/* 콘텐츠 영역 — 추후 내용 추가 */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
        <p className="text-slate-500 text-sm">선택된 마일스톤: <span className="text-indigo-400 font-semibold">{selected}</span></p>
      </div>
    </section>
  )
}
