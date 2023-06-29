import { FC } from 'react'
import { GAMES_MOCK } from '../../mock'
import { Note } from './Note'
import { NoteForm } from './NoteForm'

export const Notes: FC = () => {
  return (
    <>
      <NoteForm/>
      {GAMES_MOCK.map(el => (
        <Note game={el} key={el.id}/>
      ))}
    </>
  )
}
