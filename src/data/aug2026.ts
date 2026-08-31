import { aggregateDays } from '../utils/workAggregator'
import type { PersonRaw } from '../utils/workAggregator'

// 8/17 광복절 대체공휴일 제외
export const AUG_DATES = [
  '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
  '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14',
  '2026-08-17', '2026-08-18', '2026-08-19', '2026-08-20', '2026-08-21',
  '2026-08-24', '2026-08-25', '2026-08-26', '2026-08-27', '2026-08-28',
  '2026-08-31',
]

// PL(이상필) 제외
const RAW: PersonRaw[] = [
  { name: '김연호', entries: [
    ['교육 진행', '', ''], ['교육 진행', '', ''], ['교육 진행', '', ''], ['교육 진행', '', ''], ['교육 진행', '', ''],
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', 'Stage BAT'], ['4.12', 'Rider', 'Stage BAT'],
    ['4.12', 'Rider', '이슈 Clear'],
  ]},
  { name: '이형찬', entries: [
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', 'Stage BAT'], ['4.12', 'OP Tool', 'Stage BAT'],
    ['4.12', 'OP Tool', '이슈 Clear'],
  ]},
  { name: '모건', entries: [
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['휴무', '', ''], ['휴무', '', ''],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', 'Stage BAT'], ['4.12', 'Rider', 'Stage BAT'],
    ['4.12', 'Rider', '이슈 Clear'],
  ]},
  { name: '박건욱', entries: [
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', 'Stage BAT'], ['4.12', 'Rider', 'Stage BAT'],
    ['4.12', 'Rider', '이슈 Clear'],
  ]},
  { name: '권오성', entries: [
    ['4.12', 'Rider', 'Test Case 진행'], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''],
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['휴무', '', ''], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', 'Stage BAT'], ['4.12', 'Rider', 'Stage BAT'],
    ['4.12', 'Rider', '이슈 Clear'],
  ]},
  { name: '우영제', entries: [
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['QA 필드 테스트', '', ''], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', 'Stage BAT'], ['4.12', 'OP Tool', 'Stage BAT'],
    ['4.12', 'OP Tool', '이슈 Clear'],
  ]},
  { name: '성명철', entries: [
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', '이슈 Clear'], ['4.12', 'Rider', 'Stage BAT'], ['4.12', 'Rider', 'Stage BAT'],
    ['4.12', 'Rider', '이슈 Clear'],
  ]},
  { name: '조정호', entries: [
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['', '', ''], ['남양 필드 테스트', '', ''], ['남양 필드 테스트', '', ''], ['4.12', 'OP Tool', 'Test Case 진행'], ['휴무', '', ''],
    ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', 'Stage BAT'], ['4.12', 'OP Tool', 'Stage BAT'],
    ['4.12', 'OP Tool', '이슈 Clear'],
  ]},
  { name: '손윤수', entries: [
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'], ['4.12', 'OP Tool', 'Test Case 진행'],
    ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', '이슈 Clear'], ['4.12', 'OP Tool', 'Stage BAT'], ['4.12', 'OP Tool', 'Stage BAT'],
    ['4.12', 'OP Tool', '이슈 Clear'],
  ]},
  { name: '이경근', entries: [
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Taxi', 'Stage BAT'], ['4.12', 'Taxi', 'Stage BAT'],
    ['4.12', 'Driver/Vehicle', '이슈 Clear'],
  ]},
  { name: '이윤석', entries: [
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'], ['4.12', 'Rider', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['휴무', '', ''], ['휴무', '', ''],
    ['휴무', '', ''],
  ]},
  { name: '심명섭', entries: [
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'],
    ['', '', ''], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Driver/Vehicle', 'Test Case 진행'], ['4.12', 'Taxi', 'Test Case 진행'], ['4.12', 'Taxi', 'Test Case 진행'],
    ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', '이슈 Clear'], ['4.12', 'Driver/Vehicle', 'Stage BAT'], ['4.12', 'Driver/Vehicle', 'Stage BAT'],
    ['4.12', 'Driver/Vehicle', '이슈 Clear'],
  ]},
]

export const AUG_AGGREGATED = aggregateDays(AUG_DATES, RAW)
