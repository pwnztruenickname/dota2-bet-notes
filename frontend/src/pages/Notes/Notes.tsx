import { FC, useEffect } from 'react'
import { api } from 'shared/api'
import { useElementVisible, useRequest } from 'shared/hooks'
import { Filters } from './Filters'
import { Note } from './Note'
import { NoteForm } from './NoteForm'

export const Notes: FC = () => {
  const { elementVisible, handleHideElement, handleShowElement } =
    useElementVisible()
  const { sendRequest: senGamesRequest, response: games } = useRequest(
    api.gameAllList
  )
  const { sendRequest: senHeroesRequest, response: heroes } = useRequest(
    api.heroList
  )

  useEffect(() => {
    senHeroesRequest()
    senGamesRequest()
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
      {heroes &&
        games?.map(el => <Note game={el} key={el.id} heroes={heroes} />)}
    </>
  )
}
