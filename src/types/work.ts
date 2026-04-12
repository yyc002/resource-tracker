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
  isHoliday: boolean
  holidayLabel?: string
}
