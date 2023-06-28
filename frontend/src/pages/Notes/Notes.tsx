import { FC } from 'react'
import { GAMES_MOCK } from '../../mock'
import { Note } from './Note'

export const Notes: FC = () => {
  return (
    <>
      {GAMES_MOCK.map(el => (
        <Note isEdit={el.id === 1} game={el} key={el.id}/>
      ))}
    </>
  )
}
