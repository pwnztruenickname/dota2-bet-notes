import { FC, memo } from 'react'
import { Form } from 'antd'
import { ShouldUpdateCheckerProps } from './ShouldUpdateChecker.model'
import { shouldFormFieldUpdate } from './ShouldUpdateChecker.utils'

export const ShouldUpdateChecker: FC<ShouldUpdateCheckerProps> = memo(
  ({ fieldPath, children }) => (
    <Form.Item noStyle shouldUpdate={shouldFormFieldUpdate(fieldPath)}>
      {children}
    </Form.Item>
  )
)
