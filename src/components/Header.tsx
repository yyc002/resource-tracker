export default function Header() {
  return (
    <header className="px-6 py-5 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-white tracking-tight">
        협력업체 인력 관리
      </h1>
      <a
        href="https://docs.google.com/spreadsheets/d/10-QBEcWaHLF7xLaIzqUqtktH_XCYW164Gaa-AiAEhzo/edit?gid=537843056#gid=537843056"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-slate-400 hover:text-white transition-colors"
      >
        원본 시트 ↗
      </a>
    </header>
  )
}
