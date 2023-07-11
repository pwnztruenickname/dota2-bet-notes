import { PropsWithChildren } from 'react'
import { Layout as AntdLayout } from 'antd'
import s from '@/styles/Layout.module.scss'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AntdLayout className={s.wrapper}>
      <AntdLayout.Content>{children}</AntdLayout.Content>
    </AntdLayout>
  )
}
