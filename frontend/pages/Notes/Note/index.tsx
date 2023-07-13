import Team from './Team'
import { GameFullContract } from '@/src/api'
import Block from '@/src/components/Block'
import s from '@/styles/Note.module.scss'
import { Typography } from 'antd'
import CupIcon from '@/public/cup.svg'

interface Props {
  game?: GameFullContract
}

export default function Note({ game }: Props) {
  return (
    <Block className={s.wrapper}>
      <Team team={game?.radiant} />
      <CupIcon />
      <Team team={game?.dire} />
      <div className={s.comment}>
        <Typography.Text>{game?.comment}</Typography.Text>
      </div>
    </Block>
  )
}
