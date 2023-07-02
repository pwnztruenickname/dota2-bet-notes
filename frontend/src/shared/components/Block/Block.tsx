import { FC, PropsWithChildren, memo } from 'react'
import { theme } from 'antd'
import cn from 'classnames'
import { BlockProps } from './Block.model'
import styles from './Block.module.scss'

export const Block: FC<PropsWithChildren<BlockProps>> = memo(props => {
  const { children, className, style } = props
  const { token } = theme.useToken()

  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{
        ...style,
        border: `1px solid ${token.colorBorder}`,
        boxShadow: token.boxShadow,
      }}
    >
      {children}
    </div>
  )
})
