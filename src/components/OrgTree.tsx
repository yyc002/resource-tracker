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
      className={`bg-slate-800 border-2 ${nodeBoxClass[person.role] ?? 'border-slate-600'} rounded-lg px-4 py-2 flex flex-col items-center gap-1 min-w-[90px] flex-none`}
    >
      <Badge role={person.role} />
      <span className="text-white font-semibold text-sm">{person.name}</span>
      <span className="text-slate-500 text-xs">{person.experience}</span>
    </div>
  )
}

/** PL과 서비스 열 사이의 수평 연결선 */
function HorizConnector() {
  return <div className="w-6 h-px bg-slate-600 flex-none self-center" />
}

/**
 * 서비스 행별 분기 커넥터 (┌─ / ├─ / └─)
 * 자기 행 높이 전체를 채우며, 중앙에 수평선을 긋고
 * 위·아래 방향으로 수직선을 이어준다.
 */
function BranchLine({ isFirst, isLast }: { isFirst: boolean; isLast: boolean }) {
  return (
    <div className="flex-none w-6 self-stretch flex flex-col">
      {/* 상단 절반: 첫 번째 행이 아니면 왼쪽 수직선, 하단 경계에 수평선 */}
      <div
        className={`flex-1 border-b border-slate-600 ${!isFirst ? 'border-l border-slate-600' : ''}`}
      />
      {/* 하단 절반: 마지막 행이 아니면 왼쪽 수직선 */}
      <div className={`flex-1 ${!isLast ? 'border-l border-slate-600' : ''}`} />
    </div>
  )
}

function ServiceRow({
  service,
  isFirst,
  isLast,
}: {
  service: ServiceGroup
  isFirst: boolean
  isLast: boolean
}) {
  return (
    <div className="flex items-center">
      {/* 분기 커넥터 */}
      <BranchLine isFirst={isFirst} isLast={isLast} />

      {/* 서비스 노드 */}
      <div className="bg-slate-800 border-2 border-indigo-500 rounded-lg px-4 py-2 text-center min-w-[140px] flex-none">
        <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-900 text-indigo-300 border border-indigo-600 font-mono block mb-1">
          SERVICE
        </span>
        <p className="text-white font-semibold text-sm">{service.serviceName}</p>
      </div>

      <HorizConnector />

      {/* TL 또는 TL 없음 */}
      {service.tl ? (
        <PersonNode person={service.tl} />
      ) : (
        <div className="bg-slate-900 border-2 border-dashed border-slate-600 rounded-lg px-4 py-2 text-center min-w-[90px] flex-none">
          <span className="text-slate-500 text-xs">TL 없음</span>
        </div>
      )}

      <HorizConnector />

      {/* TE 목록 (수직 나열) */}
      <div className="flex flex-col gap-2">
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
        <div className="inline-flex items-center min-w-max">

          {/* PL */}
          <PersonNode person={data.pl} />
          <HorizConnector />

          {/* 서비스 분기 열 */}
          <div className="flex flex-col">
            {data.services.map((svc, i) => (
              <ServiceRow
                key={svc.serviceName}
                service={svc}
                isFirst={i === 0}
                isLast={i === data.services.length - 1}
              />
            ))}
          </div>

        </div>

        {/* 범례 */}
        <div className="flex gap-4 mt-6 pt-4 border-t border-slate-700 justify-center flex-wrap">
          {(['PL', 'SERVICE', 'TL', 'TE'] as const).map((r) => (
            <div key={r} className="flex items-center gap-1.5 text-xs text-slate-400">
              <div
                className={`w-3 h-3 rounded border-2 ${
                  r === 'PL'
                    ? 'border-blue-500'
                    : r === 'SERVICE'
                    ? 'border-indigo-500'
                    : r === 'TL'
                    ? 'border-green-500'
                    : 'border-amber-500'
                }`}
              />
              {r}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
