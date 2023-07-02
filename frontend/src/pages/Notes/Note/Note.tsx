import { Space, Typography } from 'antd'
import { FC, memo } from 'react'
import { HEROES_MOCK } from '../../../mock'
import { Block } from 'shared/components'
import { HeroItem } from './HeroItem'
import { NoteProps } from './Note.model'
import s from './Note.module.scss'

export const Note: FC<NoteProps> = memo(({ game }) => {
  return (
    <Block className={s.wrapper}>
      {/*TODO: any*/}
      {game.teams.map((team: any, i: number) => (
        <Space key={team.id}>
          <div>
            <Typography.Title level={3} className={s.title}>
              {team.name}
            </Typography.Title>
            <Space>
              {team.heroes.map((hero: any) => (
                <HeroItem
                  hero={HEROES_MOCK.find(el => el.value === hero)}
                  key={hero}
                />
              ))}
            </Space>
          </div>
          {!i && <Typography.Text>&mdash;</Typography.Text>}
        </Space>
      ))}
      <Typography.Text className={s.comment}>{game.comment}</Typography.Text>
    </Block>
  )
})
