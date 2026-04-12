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
