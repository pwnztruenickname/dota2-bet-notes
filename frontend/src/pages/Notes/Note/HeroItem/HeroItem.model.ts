import { FC, SVGProps } from 'react'
import { HeroContract } from 'shared/api'

export interface HeroItemProps {
  hero?: HeroContract
  roleIcon: FC<SVGProps<SVGSVGElement>>
}
