import { Button, Space } from 'antd'
import { FC, memo } from 'react'
import { HEROES_MOCK } from '../../../mock'
import { Block } from 'shared/components'
import { HeroItem } from './HeroItem'
import { HeroSelect } from './HeroSelect'
import { NoteProps } from './HeroSelect/Note.model'
import s from './Note.module.scss'
import TextArea from 'antd/es/input/TextArea'

export const Note: FC<NoteProps> = memo(({ isEdit, game }) => {
  return (
    <Block className={s.wrapper}>
      {game.teams.map((team: any, i: number) => (
        <Space key={team.id}>
          <div>
            <h2 className={s.title}>{team.name}</h2>
            <Space>
              {team.heroes.map((hero: any) => isEdit ? (
                <HeroSelect
                  key={hero}
                  heroes={HEROES_MOCK}
                  heroId={hero}
                />
              ) : (
                <HeroItem hero={HEROES_MOCK.find(el => el.value === hero)} key={hero}/>
              ))}
            </Space>
          </div>
          {!i && <div>&mdash;</div>}
        </Space>
      ))}
      {isEdit ? (
        <div>
          <TextArea rows={4}/>
          <Button block className={s.button}>Сохранить</Button>
        </div>
      ) : <div className={s.comment}>{game.comment}</div>}
    </Block>
  )
})
