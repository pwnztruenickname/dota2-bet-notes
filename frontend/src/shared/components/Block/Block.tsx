import { FC, PropsWithChildren, memo } from 'react'
import cn from 'classnames'
import { BlockProps } from './Block.model'
import styles from './Block.module.scss'

export const Block: FC<PropsWithChildren<BlockProps>> = memo(props => {
  const { children, className } = props

  return <div className={cn(styles.wrapper, className)}>{children}</div>
})
