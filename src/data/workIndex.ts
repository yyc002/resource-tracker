import type { AggregatedDay } from '../types/work'
import { FEB_AGGREGATED } from './feb2026'
import { MAR_AGGREGATED } from './mar2026'
import { APR_AGGREGATED } from './apr2026'
import { MAY_AGGREGATED } from './may2026'
import { JUN_AGGREGATED } from './jun2026'
import { JUL_AGGREGATED } from './jul2026'

export const WORK_MONTHS = [
  { year: 2026, month: 2, aggregated: FEB_AGGREGATED },
  { year: 2026, month: 3, aggregated: MAR_AGGREGATED },
  { year: 2026, month: 4, aggregated: APR_AGGREGATED },
  { year: 2026, month: 5, aggregated: MAY_AGGREGATED },
  { year: 2026, month: 6, aggregated: JUN_AGGREGATED },
  { year: 2026, month: 7, aggregated: JUL_AGGREGATED },
]

// 전체 날짜 조회 맵
export const ALL_DATA_BY_DATE = new Map<string, AggregatedDay>([
  ...FEB_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
  ...MAR_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
  ...APR_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
  ...MAY_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
  ...JUN_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
  ...JUL_AGGREGATED.map(d => [d.date, d] as [string, AggregatedDay]),
])
