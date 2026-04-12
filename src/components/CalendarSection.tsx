const CALENDAR_SRC =
  'https://calendar.google.com/calendar/embed' +
  '?src=9l2s17ql2ci7qfi9fu3nbekths%40group.calendar.google.com' +
  '&ctz=Asia%2FSeoul' +
  '&hl=ko'

export default function CalendarSection() {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-300 mb-3">
        일정
      </h2>
      {/* 컨테이너 높이를 고정하고 overflow-hidden으로 하단 캘린더 목록 잘라냄 */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden" style={{ height: 600 }}>
        {/* 화면 표시 — iframe을 더 크게 해서 하단 범례가 잘려나가도록 */}
        <iframe
          src={CALENDAR_SRC}
          className="w-full print-hidden"
          style={{ height: 720, border: 0, filter: 'invert(1) hue-rotate(180deg) contrast(0.85)' }}
          title="팀 캘린더"
        />
        {/* 인쇄 시 대체 문구 */}
        <p className="hidden print-visible text-slate-500 text-sm p-4">
          일정은 온라인에서 확인하세요: calendar.google.com
        </p>
      </div>
    </section>
  )
}
