// 일별 업무현황 수치 — 데이터 확정 시 이 파일만 업데이트하면 됩니다
export interface DailyStats {
  tcWritten: number        // TC 작성 수
  tcExecuted: number       // TC 수행 수
  issuesRegistered: number // 이슈등록 수
  issuesResolved: number   // 잔여 이슈처리 수
}

export const dailyStats: DailyStats = {
  tcWritten: 0,
  tcExecuted: 0,
  issuesRegistered: 0,
  issuesResolved: 0,
}
