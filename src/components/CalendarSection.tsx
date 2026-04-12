const CALENDAR_SRC =
  'https://calendar.google.com/calendar/embed' +
  '?src=9l2s17ql2ci7qfi9fu3nbekths%40group.calendar.google.com' +
  '&ctz=Asia%2FSeoul' +
  '&hl=ko'

export default function CalendarSection() {
  return (
    <section>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
        일정
      </h2>
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {/* 화면 표시 */}
        <iframe
          src={CALENDAR_SRC}
          className="w-full print-hidden"
          style={{ height: 600, border: 0 }}
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
