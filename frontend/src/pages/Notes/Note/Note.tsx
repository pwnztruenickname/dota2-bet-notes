import { Space } from 'antd'
import { FC, memo } from 'react'
import { HEROES_MOCK } from '../../../mock'
import { Block } from 'shared/components'
import { HeroItem } from './HeroItem'
import { NoteProps } from './Note.model'
import s from './Note.module.scss'

export const Note: FC<NoteProps> = memo(({ game }) => {
  return (
    <Block className={s.wrapper}>
      {game.teams.map((team: any, i: number) => (
        <Space key={team.id}>
          <div>
            <h2 className={s.title}>{team.name}</h2>
            <Space>
              {team.heroes.map((hero: any) => (
                <HeroItem hero={HEROES_MOCK.find(el => el.value === hero)} key={hero}/>
              ))}
            </Space>
          </div>
          {!i && <div>&mdash;</div>}
        </Space>
      ))}
      <div className={s.comment}>{game.comment}</div>
    </Block>
  )
})
