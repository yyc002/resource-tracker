// 원본 출처: Google Sheets (gid=537843056)
// https://docs.google.com/spreadsheets/d/10-QBEcWaHLF7xLaIzqUqtktH_XCYW164Gaa-AiAEhzo
import type { OrgData } from '../types/org'

export const orgData: OrgData = {
  pl: { name: '이상필', role: 'PL', experience: '13년' },
  services: [
    {
      serviceName: 'OP Tool / Map Tool',
      tl: { name: '조정호', role: 'TL', experience: '5년' },
      tes: [
        { name: '손윤수', role: 'TE', experience: '3년' },
        { name: '정우원', role: 'TE', experience: '2년' },
      ],
    },
    {
      serviceName: 'Rider',
      tl: { name: '이성형', role: 'TL', experience: '5년' },
      tes: [
        { name: '박건욱', role: 'TE', experience: '1년' },
        { name: '이형찬', role: 'TE', experience: '신입' },
        { name: '모건',   role: 'TE', experience: '신입' },
        { name: '권오성', role: 'TE', experience: '신입' },
        { name: '우영제', role: 'TE', experience: '1년' },
      ],
    },
    {
      serviceName: 'Driver / Vehicle / Taxi / Kiosk',
      tl: { name: '이경근', role: 'TL', experience: '6년' },
      tes: [
        { name: '이윤석', role: 'TE', experience: '4년' },
        { name: '심명섭', role: 'TE', experience: '8년' },
      ],
    },
  ],
}
