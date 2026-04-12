import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import OrgTree from './OrgTree'
import type { OrgData } from '../types/org'

const testData: OrgData = {
  pl: { name: '홍길동', role: 'PL', experience: '10년' },
  services: [
    {
      serviceName: 'Test Service',
      tl: { name: '김TL', role: 'TL', experience: '5년' },
      tes: [
        { name: '이TE', role: 'TE', experience: '2년' },
        { name: '박TE', role: 'TE', experience: '1년' },
      ],
    },
    {
      serviceName: 'No TL Service',
      tl: null,
      tes: [
        { name: '최TE', role: 'TE', experience: '3년' },
      ],
    },
  ],
}

describe('OrgTree', () => {
  it('PL 이름을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('홍길동')).toBeInTheDocument()
  })

  it('서비스명을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('Test Service')).toBeInTheDocument()
    expect(screen.getByText('No TL Service')).toBeInTheDocument()
  })

  it('TL 이름을 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('김TL')).toBeInTheDocument()
  })

  it('TE 이름을 모두 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('이TE')).toBeInTheDocument()
    expect(screen.getByText('박TE')).toBeInTheDocument()
    expect(screen.getByText('최TE')).toBeInTheDocument()
  })

  it('TL이 없는 서비스에서 TL없음 표시를 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getByText('TL 없음')).toBeInTheDocument()
  })

  it('역할 배지를 렌더링한다', () => {
    render(<OrgTree data={testData} />)
    expect(screen.getAllByText('PL').length).toBeGreaterThan(0)
    expect(screen.getAllByText('TL').length).toBeGreaterThan(0)
    // TE 배지 여러 개
    expect(screen.getAllByText('TE').length).toBeGreaterThan(0)
  })
})
