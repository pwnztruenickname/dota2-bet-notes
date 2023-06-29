import { FC, useEffect, useState } from 'react'
import { GAMES_MOCK, HEROES_MOCK } from '../../mock'
import { useElementVisible } from 'shared/hooks'
import { Filters } from './Filters'
import { Note } from './Note'
import { NoteForm } from './NoteForm'

export const Notes: FC = () => {
  const {
    elementVisible,
    handleHideElement,
    handleShowElement,
  } = useElementVisible()
  const [heroes, setHeroes] = useState<any[]>()

  useEffect(() => {
    setHeroes(HEROES_MOCK)
  }, [])

  return (
    <>
      <Filters
        isVisible={elementVisible}
        onVisibleElement={handleShowElement}
        heroes={heroes}
      />
      {elementVisible && (
        <NoteForm onFinishCallback={handleHideElement} heroes={heroes} />
      )}
      {GAMES_MOCK.map(el => (
        <Note game={el} key={el.id} />
      ))}
    </>
  )
}
