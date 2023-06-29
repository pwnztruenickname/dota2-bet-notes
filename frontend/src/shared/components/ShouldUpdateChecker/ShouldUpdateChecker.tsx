import { FC, memo } from 'react'
import { Form } from 'antd'
import { shouldFormFieldUpdate } from './ShouldUpdateChecker.utils'
import { ShouldUpdateCheckerProps } from './ShouldUpdateChecker.model'

export const ShouldUpdateChecker: FC<ShouldUpdateCheckerProps> = memo(
  ({ fieldPath, children }) => (
    <Form.Item noStyle shouldUpdate={shouldFormFieldUpdate(fieldPath)}>
      {children}
    </Form.Item>
  )
)
