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
  '4.10': [
    {
      product: 'Rider',
      people: [],
    },
    {
      // 출처: https://docs.google.com/spreadsheets/d/1w_m1YYXoksTfASl_VOuZjySULd8qv2aEqc_ijv777zQ (gid=17091790)
      // O열(작성자) + P열(Tester) 합산 기준
      product: 'OP Tool',
      people: [
        { name: '손윤수', value: 5958 },
        { name: '정우원', value: 3168 },
        { name: '조정호', value: 2080 },
        { name: '심명섭', value:  795 },
        { name: '이경근', value:  771 },
        { name: '이윤석', value:  452 },
        { name: '이형찬', value:  247 },
        { name: '권오성', value:   93 },
        { name: '모건',   value:   39 },
      ],
    },
    {
      product: 'Kiosk',
      people: [],
    },
    {
      product: 'Driver/Vehicle',
      people: [],
    },
  ],
}
