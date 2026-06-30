import { aggregateDays } from '../utils/workAggregator'
import type { PersonRaw } from '../utils/workAggregator'

// 6/3 공직선거일(지방선거) 공휴일 제외
export const JUN_DATES = [
  '2026-06-01', '2026-06-02',
  '2026-06-04', '2026-06-05',
  '2026-06-08', '2026-06-09', '2026-06-10', '2026-06-11', '2026-06-12',
  '2026-06-15', '2026-06-16', '2026-06-17', '2026-06-18', '2026-06-19',
  '2026-06-22', '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26',
  '2026-06-29', '2026-06-30',
]

// PL(이상필) 제외
const RAW: PersonRaw[] = [
  { name: '이성형', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'],
    ['D2D 필드 테스트', '', ''], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['휴무', '', ''],
    ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '이형찬', entries: [
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['휴무', '', ''],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'BAT 진행'], ['4.11', 'OP Tool', 'BAT 진행'],
    ['4.11', 'OP Tool', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
  ]},
  { name: '모건', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'],
    ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
    ['휴무', '', ''], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '박건욱', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'],
    ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
    ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '권오성', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'],
    ['휴무', '', ''], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
    ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '우영제', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['휴무', '', ''],
    ['지쿠 필드 테스트', '', ''], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
    ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '성명철', entries: [
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'],
    ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'TC 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'],
    ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.11', 'Driver/Vehicle', 'TC 현행화'],
    ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.11', 'Driver/Vehicle', 'TC 현행화'],
  ]},
  { name: '조정호', entries: [
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'BAT 진행'], ['4.11', 'OP Tool', 'BAT 진행'],
    ['4.11', 'OP Tool', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
  ]},
  { name: '손윤수', entries: [
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'],
    ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'TC 진행'], ['4.11', 'OP Tool', 'BAT 진행'], ['휴무', '', ''],
    ['4.11', 'OP Tool', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
    ['4.11', 'OP Tool', 'TC 현행화'], ['4.11', 'OP Tool', 'TC 현행화'],
  ]},
  { name: '이경근', entries: [
    ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'],
    ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'],
    ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'], ['4.11', 'Taxi', 'TC 진행'],
    ['휴무', '', ''], ['휴무', '', ''], ['휴무', '', ''], ['4.11', 'Taxi', 'BAT 진행'], ['4.11', 'Taxi', 'BAT 진행'],
    ['4.11', 'Taxi', 'BAT 진행'], ['4.11', 'Taxi', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
    ['4.11', 'Rider', 'TC 현행화'], ['4.11', 'Rider', 'TC 현행화'],
  ]},
  { name: '이윤석', entries: [
    ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'],
    ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'],
    ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'],
    ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Kiosk', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Kiosk', 'BAT 진행'], ['4.11', 'Kiosk', 'BAT 진행'],
    ['지쿠 필드 테스트', '', ''], ['4.11', 'Taxi', 'BAT 진행'], ['지쿠 필드 테스트', '', ''], ['4.11', 'Taxi', 'BAT 진행'], ['4.11', 'Taxi', 'BAT 진행'],
    ['4.11', 'Taxi', 'BAT 진행'], ['4.11', 'Taxi', 'BAT 진행'],
  ]},
  { name: '심명섭', entries: [
    ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'],
    ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'],
    ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'],
    ['휴무', '', ''], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'TC 진행'], ['4.11', 'Driver/Vehicle', 'BAT 진행'], ['4.11', 'Driver/Vehicle', 'BAT 진행'],
    ['4.11', 'Driver/Vehicle', 'BAT 진행'], ['4.11', 'Rider', 'BAT 진행'], ['4.11', 'Rider', '잔여 이슈 정리'], ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.11', 'Driver/Vehicle', 'TC 현행화'],
    ['4.11', 'Driver/Vehicle', 'TC 현행화'], ['4.11', 'Driver/Vehicle', 'TC 현행화'],
  ]},
]

export const JUN_AGGREGATED = aggregateDays(JUN_DATES, RAW)
