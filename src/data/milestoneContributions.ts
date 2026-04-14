// 마일스톤 별 제품/인원 기여도 데이터
// 추후 TC 작성자+수행자 데이터 입력 시 이 파일의 people 배열을 채워넣으세요
export interface PersonContribution {
  name: string
  value: number  // TC 작성 + 수행 합계
}

export interface ProductContribution {
  product: string
  people: PersonContribution[]
}

export type MilestoneContributions = Record<string, ProductContribution[]>

const PRODUCTS = ['Rider', 'OP Tool', 'Kiosk', 'Driver/Vehicle']

function emptyProducts(): ProductContribution[] {
  return PRODUCTS.map(product => ({ product, people: [] }))
}

export const milestoneContributions: MilestoneContributions = {
  '4.9':   emptyProducts(),
  '4.9.5': emptyProducts(),
  '4.10':  emptyProducts(),
}
