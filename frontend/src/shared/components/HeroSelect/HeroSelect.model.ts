import { SelectProps } from 'antd/es/select'
import { DefaultOptionType } from 'rc-select/lib/Select'

export interface HeroSelectProps
  extends Omit<
    SelectProps<any, DefaultOptionType & { url: string }>,
    'placeholder' | 'showSearch'
  > {}
