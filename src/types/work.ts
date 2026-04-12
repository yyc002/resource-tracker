export interface ServiceWork {
  service: string
  task: string
  md: number
}

export interface MilestoneGroup {
  milestone: string
  services: ServiceWork[]
}

export interface StandaloneWork {
  label: string
  md: number
}

export interface AggregatedDay {
  date: string
  milestones: MilestoneGroup[]
  standalone: StandaloneWork[]
  offMd: number           // 휴무(1) + 반차(0.5) 합계
  isHoliday: boolean
  holidayLabel?: string
}
