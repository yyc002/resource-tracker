import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CalendarSection from './CalendarSection'

describe('CalendarSection', () => {
  it('섹션 제목을 렌더링한다', () => {
    render(<CalendarSection />)
    expect(screen.getByText('일정')).toBeInTheDocument()
  })

  it('Google Calendar iframe을 렌더링한다', () => {
    render(<CalendarSection />)
    const iframe = document.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.src).toContain('calendar.google.com')
  })

  it('인쇄 시 안내 문구가 있다', () => {
    render(<CalendarSection />)
    expect(screen.getByText(/온라인에서 확인/)).toBeInTheDocument()
  })
})
