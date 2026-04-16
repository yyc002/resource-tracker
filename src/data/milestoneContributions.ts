// 마일스톤 별 제품/인원 기여도 데이터
// O열(작성자) + P열(Tester) 합산 기준
// 출처: https://docs.google.com/spreadsheets/d/1w_m1YYXoksTfASl_VOuZjySULd8qv2aEqc_ijv777zQ

export interface PersonContribution {
  name: string
  value: number
}

export interface ProductContribution {
  product: string
  people: PersonContribution[]
}

export type MilestoneContributions = Record<string, ProductContribution[]>

function emptyProducts(): ProductContribution[] {
  return [
    { product: 'Rider',          people: [] },
    { product: 'OP Tool',        people: [] },
    { product: 'Kiosk',          people: [] },
    { product: 'Driver/Vehicle', people: [] },
  ]
}

export const milestoneContributions: MilestoneContributions = {
  '4.9':   emptyProducts(),
  '4.9.5': emptyProducts(),
  '4.10': [
    {
      product: 'Rider',  // gid=617835110
      people: [
        { name: '모건',   value: 2968 },
        { name: '박건욱', value: 2153 },
        { name: '권오성', value: 1333 },
        { name: '이성형', value: 1116 },
        { name: '이형찬', value:  849 },
        { name: '이경근', value:  634 },
        { name: '우영제', value:  256 },
      ],
    },
    {
      product: 'OP Tool',  // gid=17091790
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
      product: 'Kiosk',  // gid=963234383
      people: [
        { name: '심명섭', value: 187 },
        { name: '이경근', value: 177 },
      ],
    },
    {
      product: 'Driver/Vehicle',  // gid=1598654247
      people: [
        { name: '이윤석', value: 2229 },
        { name: '심명섭', value: 2021 },
      ],
    },
  ],
}
