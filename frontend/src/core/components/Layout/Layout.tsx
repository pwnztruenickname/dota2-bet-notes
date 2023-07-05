import { FC, PropsWithChildren, memo } from 'react'
import { Layout as AntdLayout } from 'antd'
import s from './Layout.module.scss'

export const Layout: FC<PropsWithChildren> = memo(({ children }) => {
  return (
    <AntdLayout className={s.wrapper}>
      <AntdLayout.Content>{children}</AntdLayout.Content>
    </AntdLayout>
  )
})
