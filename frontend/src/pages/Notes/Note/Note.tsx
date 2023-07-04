import { FC, memo } from 'react'
import { Space, Typography } from 'antd'
import { Block } from 'shared/components'
import { HeroItem } from './HeroItem'
import { NoteProps } from './Note.model'
import s from './Note.module.scss'

export const Note: FC<NoteProps> = memo(({ game, heroes }) => {
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
                <HeroItem
                  hero={heroes.find(el => el.id === hero.id)}
                  key={hero.id}
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
