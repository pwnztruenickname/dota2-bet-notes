import { SelectProps } from 'antd/es/select'

export interface HeroSelectProps
  extends Omit<SelectProps, 'placeholder' | 'showSearch'> {}
