import { Form, FormItemProps } from 'antd'
import { NamePath } from 'antd/lib/form/interface'
import { shouldFormFieldUpdate } from './utils'

export interface Props {
  fieldPath: NamePath | NamePath[]
  children: FormItemProps['children']
}

export default function ShouldUpdateChecker({ fieldPath, children }: Props) {
  return (
    <Form.Item noStyle shouldUpdate={shouldFormFieldUpdate(fieldPath)}>
      {children}
    </Form.Item>
  )
}
