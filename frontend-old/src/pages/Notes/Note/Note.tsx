import { FC, memo } from 'react'
import { Space, Typography } from 'antd'
import { Block } from 'shared/components'
import { ReactComponent as CupIcon } from 'shared/img/cup.svg'
import { ROLES_LIST } from '../NoteForm/NoteForm.consts'
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
                // TODO : убрать required
                <HeroItem
                  hero={heroes.find(el => el.id === hero.hero!.id)}
                  roleIcon={ROLES_LIST[hero.gameRole!]}
                  key={hero.id}
                />
              ))}
            </Space>
          </div>
          {!i && <CupIcon />}
        </Space>
      ))}
      <Typography.Text className={s.comment}>{game.comment}</Typography.Text>
    </Block>
  )
})
