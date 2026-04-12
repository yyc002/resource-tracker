import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('대시보드 타이틀을 렌더링한다', () => {
    render(<Header />)
    expect(screen.getByText('협력업체 인력 관리')).toBeInTheDocument()
  })
})
