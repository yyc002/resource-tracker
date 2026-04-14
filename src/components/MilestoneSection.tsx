import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { milestoneContributions } from '../data/milestoneContributions'
import type { PersonContribution } from '../data/milestoneContributions'

const MILESTONES = ['4.9', '4.9.5', '4.10'] as const
type Milestone = typeof MILESTONES[number]

// 인원별 고정 색상
const COLORS = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#ec4899', '#14b8a6', '#84cc16',
  '#0ea5e9', '#a855f7',
]

function getColor(index: number): string {
  return COLORS[index % COLORS.length]
}

function toPercent(value: number, total: number): string {
  return total === 0 ? '0%' : `${((value / total) * 100).toFixed(1)}%`
}

interface TooltipProps {
  active?: boolean
  payload?: { name: string; value: number; payload: PersonContribution }[]
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  const total = payload[0].payload as unknown as { total: number }
  return (
    <div className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-xs text-slate-200">
      <p className="font-semibold">{name}</p>
      <p>{value}건</p>
    </div>
  )
}

interface ProductChartProps {
  product: string
  people: PersonContribution[]
}

function ProductChart({ product, people }: ProductChartProps) {
  const total = people.reduce((s, p) => s + p.value, 0)
  const isEmpty = people.length === 0 || total === 0

  return (
    <div className="flex flex-col items-center">
      {/* 제품명 */}
      <p className="text-sm font-semibold text-slate-300 mb-3">{product}</p>

      {isEmpty ? (
        /* 데이터 없을 때 빈 원 */
        <div className="w-40 h-40 rounded-full border-4 border-dashed border-slate-700 flex items-center justify-center">
          <span className="text-slate-600 text-xs">데이터 없음</span>
        </div>
      ) : (
        <div style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={people}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={36}
                paddingAngle={2}
              >
                {people.map((_, i) => (
                  <Cell key={i} fill={getColor(i)} />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip />}
                formatter={(v: number) => [`${v}건`]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 범례 */}
      {!isEmpty && (
        <ul className="mt-3 space-y-1 w-full max-w-[180px]">
          {people.map((p, i) => (
            <li key={p.name} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-none" style={{ background: getColor(i) }} />
                <span className="text-slate-300">{p.name}</span>
              </span>
              <span className="text-slate-400 font-mono">{toPercent(p.value, total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function MilestoneSection() {
  const [selected, setSelected] = useState<Milestone>('4.10')
  const products = milestoneContributions[selected]

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

      {/* 제품별 원형 그래프 */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {products.map(({ product, people }) => (
            <ProductChart key={product} product={product} people={people} />
          ))}
        </div>
      </div>
    </section>
  )
}
