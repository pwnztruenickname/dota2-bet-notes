import { DefaultOptionType } from 'rc-select/lib/Select'

export interface HeroSelectProps {
  heroes: (DefaultOptionType & {url: string})[]
  heroId: number
}
