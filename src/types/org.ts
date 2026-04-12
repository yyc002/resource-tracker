export type Role = 'PL' | 'TL' | 'TE'

export interface Person {
  name: string
  role: Role
  experience: string  // 예: "5년", "신입", "13년"
}

export interface ServiceGroup {
  serviceName: string   // 예: "OP Tool / Map Tool"
  tl: Person | null     // TL이 없는 서비스는 null
  tes: Person[]
}

export interface OrgData {
  pl: Person
  services: ServiceGroup[]
}
