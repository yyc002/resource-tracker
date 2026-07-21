import { aggregateDays } from '../utils/workAggregator'
import type { PersonRaw } from '../utils/workAggregator'

export const JUL_DATES = [
  '2026-07-01', '2026-07-02', '2026-07-03',
  '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10',
  '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16', '2026-07-17',
  '2026-07-20', '2026-07-21', '2026-07-22', '2026-07-23', '2026-07-24',
  '2026-07-27', '2026-07-28', '2026-07-29',
]

// PL(이상필) 제외
const RAW: PersonRaw[] = [
  { name: '이성형', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', '기획서 리뷰'],
    ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '이형찬', entries: [
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', '기획서 리뷰'],
    ['휴무(예비군)', '', ''], ['휴무(예비군)', '', ''], ['휴무(예비군)', '', ''], ['휴무(예비군)', '', ''], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '모건', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', '기획서 리뷰'],
    ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '박건욱', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', '기획서 리뷰'],
    ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '권오성', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', '기획서 리뷰'],
    ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '우영제', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', '기획서 리뷰'],
    ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['휴무', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '성명철', entries: [
    ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', '기획서 리뷰'],
    ['4.12', 'Rider', '기획서 리뷰'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'],
    ['4.12', 'Rider', 'Test Case 작성'], ['4.12', 'Rider', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '조정호', entries: [
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', '기획서 리뷰'],
    ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '손윤수', entries: [
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', '기획서 리뷰'],
    ['4.12', 'OP Tool', '기획서 리뷰'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['휴무', '', ''],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'],
    ['4.12', 'OP Tool', 'Test Case 작성'], ['4.12', 'OP Tool', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '이경근', entries: [
    ['4.11', 'Rider', 'TC 현행화'], ['4.12', 'Taxi', '기획서 리뷰'], ['4.12', 'Taxi', '기획서 리뷰'],
    ['4.12', 'Taxi', '기획서 리뷰'], ['4.12', 'Taxi', 'Test Case 작성'], ['4.12', 'Taxi', 'Test Case 작성'], ['4.12', 'Taxi', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'],
    ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'],
    ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '이윤석', entries: [
    ['4.11', 'Taxi', 'BAT 진행'], ['4.12', 'Driver/Vehicle', '기획서 리뷰'], ['휴무', '', ''],
    ['4.12', 'Driver/Vehicle', '기획서 리뷰'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'],
    ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['휴무', '', ''], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'],
    ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['', '', ''], ['', '', ''], ['', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
  { name: '심명섭', entries: [
    ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.12', 'Driver/Vehicle', '기획서 리뷰'], ['4.12', 'Driver/Vehicle', '기획서 리뷰'],
    ['4.12', 'Driver/Vehicle', '기획서 리뷰'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'],
    ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', 'Test Case 작성'], ['4.12', 'Driver/Vehicle', ''], ['4.12', 'Driver/Vehicle', ''],
    ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''],
    ['', '', ''], ['', '', ''], ['', '', ''],
  ]},
]

export const JUL_AGGREGATED = aggregateDays(JUL_DATES, RAW)
