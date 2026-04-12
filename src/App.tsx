import Header from './components/Header'
import CalendarSection from './components/CalendarSection'
import OrgTree from './components/OrgTree'
import { orgData } from './data/orgData'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        <CalendarSection />
        <OrgTree data={orgData} />
      </main>
    </div>
  )
}
