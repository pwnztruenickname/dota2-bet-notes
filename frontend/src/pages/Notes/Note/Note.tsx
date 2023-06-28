import { FC, memo } from 'react'
import s from './Note.module.scss'

export const Note: FC = memo((props) => {
  return (
    <div className={s.wrapper}>Hello world!</div>
  )
})
