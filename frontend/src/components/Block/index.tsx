import { CSSProperties, PropsWithChildren } from 'react'
import { theme } from 'antd'
import cn from 'classnames'
import s from '@/styles/Block.module.scss'

interface Props {
  className?: string
  style?: CSSProperties
}

export default function Block({
  children,
  className,
  style,
}: PropsWithChildren<Props>) {
  const { token } = theme.useToken()

  return (
    <div
      className={cn(s.wrapper, className)}
      style={{
        ...style,
        border: `1px solid ${token.colorBorder}`,
        boxShadow: token.boxShadow,
      }}
    >
      {children}
    </div>
  )
}
