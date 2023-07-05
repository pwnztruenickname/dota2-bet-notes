import { FormItemProps } from 'antd'
import { NamePath } from 'antd/lib/form/interface'

export interface ShouldUpdateCheckerProps {
  fieldPath: NamePath | NamePath[]
  children: FormItemProps['children']
}
