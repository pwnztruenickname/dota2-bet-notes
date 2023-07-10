import HeroItem from './HeroItem'
import { GameFullContract } from '@/src/api'
import Block from '@/src/components/Block'
import s from '@/styles/Note.module.scss'
import { Space, Typography } from 'antd'
import CupIcon from '@/public/cup.svg'

interface Props {
  game: GameFullContract
}

export default function Note({ game }: Props) {
  return (
    <Block className={s.wrapper}>
      {/*TODO: убрать required*/}
      {[game.firstTeam!, game.secondTeam!].map((team, i) => (
        // TODO: убрать required
        <Space key={team.team!.id}>
          <div>
            <Typography.Title level={3} className={s.title}>
              {/*TODO: убрать required*/}
              {team.team!.name}
            </Typography.Title>
            <Space>
              {/*TODO: убрать required*/}
              {team.charactersInTeam!.map(hero => (
                // TODO : убрать required
                <HeroItem hero={hero} key={hero.id} />
              ))}
            </Space>
          </div>
          {!i && <CupIcon />}
        </Space>
      ))}
      <div className={s.comment}>
        <Typography.Text>{game.comment}</Typography.Text>
      </div>
    </Block>
  )
}
