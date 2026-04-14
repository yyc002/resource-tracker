import type { AggregatedDay, MilestoneGroup, ServiceWork, StandaloneWork } from '../types/work'

export type E = [string, string, string]

export interface PersonRaw {
  name: string
  entries: E[]
}

const SKIP_LABELS = new Set(['', '설날'])
const HOLIDAY_LABELS = new Set(['설날'])
const OFF_FULL = new Set(['휴무'])
const OFF_HALF = new Set(['오후 반차', '오전 반차', '오전반차', '오후반차'])

function isVersion(m: string): boolean {
  return /^\d+\.\d+/.test(m)
}

export function aggregateDays(dates: string[], raw: PersonRaw[]): AggregatedDay[] {
  return dates.map((date, i) => {
    const allLabels = raw.map(p => p.entries[i][0])
    const isHoliday = allLabels.every(m => HOLIDAY_LABELS.has(m) || m === '')
    if (isHoliday) {
      return { date, milestones: [], standalone: [], offMd: 0, isHoliday: true, holidayLabel: '설날' }
    }

    const milestoneMap = new Map<string, Map<string, Map<string, number>>>()
    const standaloneMap = new Map<string, number>()
    let offMd = 0

    for (const person of raw) {
      const [milestone, service, task] = person.entries[i]
      if (SKIP_LABELS.has(milestone)) continue
      if (OFF_FULL.has(milestone)) { offMd += 1; continue }
      if (OFF_HALF.has(milestone)) { offMd += 0.5; continue }

      if (isVersion(milestone)) {
        if (!milestoneMap.has(milestone)) milestoneMap.set(milestone, new Map())
        const svcMap = milestoneMap.get(milestone)!
        if (!svcMap.has(service)) svcMap.set(service, new Map())
        const taskMap = svcMap.get(service)!
        taskMap.set(task, (taskMap.get(task) ?? 0) + 1)
      } else {
        let label = milestone
        if (milestone === '필드 테스트' && service.trim()) label = `필드 테스트 (${service.trim()})`
        standaloneMap.set(label, (standaloneMap.get(label) ?? 0) + 1)
      }
    }

    const milestones: MilestoneGroup[] = []
    for (const [milestone, svcMap] of milestoneMap) {
      const services: ServiceWork[] = []
      for (const [svc, taskMap] of svcMap) {
        for (const [tsk, md] of taskMap) services.push({ service: svc, task: tsk, md })
      }
      milestones.push({ milestone, services })
    }

    const standalone: StandaloneWork[] = []
    for (const [label, md] of standaloneMap) standalone.push({ label, md })

    return { date, milestones, standalone, offMd, isHoliday: false }
  })
}
