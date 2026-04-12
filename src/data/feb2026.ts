import type { AggregatedDay, MilestoneGroup, ServiceWork, StandaloneWork } from '../types/work'

// 2월 영업일 20일
export const FEB_DATES = [
  '2026-02-02', '2026-02-03', '2026-02-04', '2026-02-05', '2026-02-06',
  '2026-02-09', '2026-02-10', '2026-02-11', '2026-02-12', '2026-02-13',
  '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20',
  '2026-02-23', '2026-02-24', '2026-02-25', '2026-02-26', '2026-02-27',
]

// [milestone, service, task] — 인덱스는 FEB_DATES와 동일
type E = [string, string, string]

interface PersonRaw {
  name: string
  entries: E[]
}

const 현장대리인 = '현장 대리인 및 고객사 대응'

const RAW: PersonRaw[] = [
  { name: '이상필', entries: [
    [현장대리인, '', ''], [현장대리인, '', ''], ['휴무', '', ''],
    [현장대리인, '', ''], [현장대리인, '', ''], [현장대리인, '', ''],
    [현장대리인, '', ''], [현장대리인, '', ''], [현장대리인, '', ''],
    ['휴무', '', ''],     ['설날', '', ''],     ['설날', '', ''],
    ['설날', '', ''],     [현장대리인, '', ''], [현장대리인, '', ''],
    [현장대리인, '', ''], [현장대리인, '', ''], [현장대리인, '', ''],
    [현장대리인, '', ''], [현장대리인, '', ''],
  ]},
  { name: '이성형', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['필드 테스트', '', ''],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['필드 테스트', '어울링', ''],          ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.10', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'],
  ]},
  { name: '이형찬', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],      ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.10', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['휴무', '', ''],
  ]},
  { name: '모건', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],      ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.10', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'],
  ]},
  { name: '박건욱', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],      ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.10', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'],
  ]},
  { name: '권오성', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['필드 테스트', '어울링', ''],          ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.9.7', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.9.7', 'Rider', 'TC 작성'], ['4.9.7', 'Rider', 'TC 작성'],
    ['4.9.7', 'Rider', 'TC 진행'], ['4.9.7', 'Rider', 'TC 진행'],
    ['4.9.7', 'Rider', 'TC 진행'], ['4.9.7', 'Rider', 'TC 진행'],
    ['4.9.7', 'Rider', 'TC 진행'],
  ]},
  { name: '황재현', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],        ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'], ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],      ['4.9.5', 'Rider', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],       ['4.10', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'], ['4.10', 'Rider', 'TC 작성'],
    ['4.10', 'Rider', 'TC 작성'],
  ]},
  { name: '조정호', entries: [
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['4.9.5', 'OP Tool', 'TC 진행'],
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['4.9.5', 'OP Tool', '잔여 이슈 처리'],
    ['4.9.5', 'OP Tool', '잔여 이슈 처리'], ['4.9.5', 'OP Tool', 'Stage BAT'],
    ['필드 테스트', 'ST1 BAT', ''],          ['필드 테스트', '용인 신규지역 오픈', ''],
    ['필드 테스트', '용인 신규지역 오픈', ''],['4.10', 'OP Tool', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['휴무', '', ''], ['휴무', '', ''],
    ['4.10', 'OP Tool', 'TC 작성'],  ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'],  ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'Map Tool', 'TC 작성'],
  ]},
  { name: '손윤수', entries: [
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['4.9.5', 'OP Tool', 'TC 진행'],
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['4.9.5', 'OP Tool', '잔여 이슈 처리'],
    ['4.9.5', 'OP Tool', '잔여 이슈 처리'], ['4.9.5', 'OP Tool', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],        ['4.9.5', 'OP Tool', 'Stage BAT'],
    ['휴무', '', ''],                        ['4.10', 'OP Tool', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'OP Tool', 'TC 작성'], ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'], ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'], ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'],
  ]},
  { name: '정우원', entries: [
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['4.9.5', 'OP Tool', 'TC 진행'],
    ['4.9.5', 'OP Tool', 'TC 진행'],        ['오후 반차', 'OP Tool', '잔여 이슈 처리'],
    ['4.9.5', 'OP Tool', '잔여 이슈 처리'], ['4.9.5', 'OP Tool', 'Stage BAT'],
    ['필드 테스트', '어울링', ''],            ['4.9.5', 'OP Tool', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Real BAT'],         ['4.10', 'OP Tool', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'OP Tool', 'TC 작성'], ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'], ['오후 반차', 'OP Tool', 'TC 작성'],
    ['4.10', 'OP Tool', 'TC 작성'], ['4.10', 'OP Tool', 'TC 작성'],
    ['4.10', 'Map Tool', 'TC 작성'],
  ]},
  { name: '이경근', entries: [
    ['4.9.5', 'Rider', 'TC 진행'],          ['4.9.5', 'Rider', 'TC 진행'],
    ['4.9.5', 'Rider', 'TC 진행'],          ['4.9.5', 'Rider', '잔여 이슈 처리'],
    ['4.9.5', 'Rider', '잔여 이슈 처리'],   ['4.9.5', 'Driver/Vehicle', 'Stage BAT'],
    ['4.9.5', 'Driver/Vehicle', 'Stage BAT'],['4.9.5', 'Driver/Vehicle', 'Stage BAT'],
    ['4.9.5', 'Taxi', 'Real BAT'],           ['4.9.7', 'Rider', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.9.7', 'Rider', 'TC 작성'], ['4.9.7', 'Rider', 'TC 작성'],
    ['4.9.7', 'Rider', 'TC 진행'], ['4.9.7', 'Rider', 'TC 진행'],
    ['4.9.7', 'Rider', 'TC 진행'], ['4.9.7', 'Rider', 'TC 진행'],
    ['4.9.7', 'Rider', 'TC 진행'],
  ]},
  { name: '이윤석', entries: [
    ['4.9.5', 'Driver/Vehicle', 'TC 진행'],        ['4.9.5', 'Driver/Vehicle', 'TC 진행'],
    ['4.9.5', 'Driver/Vehicle', 'TC 진행'],        ['4.9.5', 'Driver/Vehicle', '잔여 이슈 처리'],
    ['4.9.5', 'Driver/Vehicle', '잔여 이슈 처리'], ['4.9.5', 'Driver/Vehicle', 'Stage BAT'],
    ['4.9.5', 'Rider', 'Stage BAT'],               ['4.9.5', 'Driver/Vehicle', 'Stage BAT'],
    ['4.9.5', 'Taxi', 'Real BAT'],                 ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['휴무', '', ''],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
  ]},
  { name: '심명섭', entries: [
    ['4.9.5', 'Driver/Vehicle', 'TC 진행'], ['4.9.5', 'Taxi', 'TC 진행'],
    ['4.9.5', 'Taxi', 'TC 진행'],           ['휴무', '', ''],
    ['4.9.5', 'Driver/Vehicle', '잔여 이슈 처리'], ['4.9.5', 'Taxi', 'Stage BAT'],
    ['필드 테스트', 'ST1 BAT', ''],          ['필드 테스트', '용인 신규지역 오픈', ''],
    ['필드 테스트', '용인 신규지역 오픈', ''],['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['', '', ''], ['', '', ''], ['', '', ''],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['4.10', 'Driver/Vehicle', 'TC 작성'], ['4.10', 'Driver/Vehicle', 'TC 작성'],
    ['휴무', '', ''],
  ]},
]

const OFF_LABELS = new Set(['', '휴무', '설날'])
const HOLIDAY_LABELS = new Set(['설날'])

function isVersion(m: string): boolean {
  return /^\d+\.\d+/.test(m)
}

function isHalfDay(m: string): boolean {
  return m === '오후 반차'
}

export function aggregateDay(dateIndex: number): AggregatedDay {
  const date = FEB_DATES[dateIndex]

  // 모든 사람이 쉬는 날(설날) 감지
  const allLabels = RAW.map(p => p.entries[dateIndex][0])
  const isHoliday = allLabels.every(m => HOLIDAY_LABELS.has(m) || m === '')
  if (isHoliday) {
    return { date, milestones: [], standalone: [], isHoliday: true, holidayLabel: '설날' }
  }

  // milestone → service → task → md 집계
  const milestoneMap = new Map<string, Map<string, Map<string, number>>>()
  const standaloneMap = new Map<string, number>()

  for (const person of RAW) {
    const [milestone, service, task] = person.entries[dateIndex]
    if (OFF_LABELS.has(milestone)) continue

    const md = isHalfDay(milestone) ? 0.5 : 1

    if (isVersion(milestone)) {
      if (!milestoneMap.has(milestone)) milestoneMap.set(milestone, new Map())
      const svcMap = milestoneMap.get(milestone)!
      if (!svcMap.has(service)) svcMap.set(service, new Map())
      const taskMap = svcMap.get(service)!
      taskMap.set(task, (taskMap.get(task) ?? 0) + md)
    } else {
      // 필드 테스트: 장소 포함
      let label = milestone
      if (milestone === '필드 테스트' && service.trim()) {
        label = `필드 테스트 (${service.trim()})`
      }
      standaloneMap.set(label, (standaloneMap.get(label) ?? 0) + md)
    }
  }

  const milestones: MilestoneGroup[] = []
  for (const [milestone, svcMap] of milestoneMap) {
    const services: ServiceWork[] = []
    for (const [svc, taskMap] of svcMap) {
      for (const [tsk, md] of taskMap) {
        services.push({ service: svc, task: tsk, md })
      }
    }
    milestones.push({ milestone, services })
  }

  const standalone: StandaloneWork[] = []
  for (const [label, md] of standaloneMap) {
    standalone.push({ label, md })
  }

  return { date, milestones, standalone, isHoliday: false }
}

export const FEB_AGGREGATED: AggregatedDay[] = FEB_DATES.map((_, i) => aggregateDay(i))
