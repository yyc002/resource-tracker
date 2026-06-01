import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { milestoneContributions } from '../data/milestoneContributions'
import type { PersonContribution } from '../data/milestoneContributions'

const MILESTONES = ['4.9', '4.9.5', '4.10', '4.11'] as const
type Milestone = typeof MILESTONES[number]

// 인원별 고정 색상 팔레트
const PALETTE = [
  '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#ec4899', '#14b8a6', '#84cc16',
  '#0ea5e9', '#a855f7', '#e11d48',
]

function toPercent(value: number, total: number): string {
  return total === 0 ? '0%' : `${((value / total) * 100).toFixed(1)}%`
}

// ── 툴팁 ─────────────────────────────────────────────
interface TooltipPayloadItem {
  name: string
  value: number
}
function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-xs text-slate-200 shadow">
      <p className="font-semibold mb-0.5">{name}</p>
      <p>{value.toLocaleString()}건</p>
    </div>
  )
}

// ── 제품별 차트 ───────────────────────────────────────
function ProductChart({
  product,
  people,
  colorMap,
}: {
  product: string
  people: PersonContribution[]
  colorMap: Map<string, string>
}) {
  const total = people.reduce((s, p) => s + p.value, 0)
  const isEmpty = people.length === 0 || total === 0

  return (
    <div className="flex flex-col items-center">
      <p className="text-sm font-semibold text-slate-300 mb-3">{product}</p>

      {isEmpty ? (
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
                {people.map((p) => (
                  <Cell key={p.name} fill={colorMap.get(p.name) ?? '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 비율 텍스트 (차트 아래) */}
      {!isEmpty && (
        <p className="mt-2 text-xs text-slate-500">
          총 {total.toLocaleString()}건
        </p>
      )}
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────
export default function MilestoneSection() {
  const [selected, setSelected] = useState<Milestone>('4.10')
  const products = milestoneContributions[selected]

  // 현재 마일스톤에 등장하는 모든 인원 → 일관된 색상 매핑
  const colorMap = useMemo(() => {
    const names = Array.from(
      new Set(products.flatMap(p => p.people.map(pp => pp.name)))
    )
    const map = new Map<string, string>()
    names.forEach((name, i) => map.set(name, PALETTE[i % PALETTE.length]))
    return map
  }, [products])

  // 범례용: 한 번이라도 등장한 인원 (합계 기준 내림차순)
  const legendPeople = useMemo(() => {
    const totals = new Map<string, number>()
    products.forEach(prod =>
      prod.people.forEach(p => totals.set(p.name, (totals.get(p.name) ?? 0) + p.value))
    )
    return [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, total]) => ({ name, total }))
  }, [products])

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

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        {/* 제품별 차트 */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-8">
          {products.map(({ product, people }) => (
            <ProductChart
              key={product}
              product={product}
              people={people}
              colorMap={colorMap}
            />
          ))}
        </div>

        {/* 공통 범례 */}
        {legendPeople.length > 0 && (
          <div className="border-t border-slate-700 pt-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {legendPeople.map(({ name }) => (
                <div key={name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-3 h-3 rounded-full flex-none"
                    style={{ background: colorMap.get(name) }}
                  />
                  <span className="text-slate-300">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
