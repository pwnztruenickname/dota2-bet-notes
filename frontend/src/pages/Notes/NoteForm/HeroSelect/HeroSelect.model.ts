import { FormInstance } from 'antd'
import { DefaultOptionType } from 'rc-select/lib/Select'

export interface HeroSelectProps {
  heroes: (DefaultOptionType & { url: string })[]
  name: number
  form: FormInstance
}
