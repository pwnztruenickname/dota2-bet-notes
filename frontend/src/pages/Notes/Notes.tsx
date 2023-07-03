import { FC, useEffect } from 'react'
import { api } from 'shared/api'
import { useElementVisible, useRequest } from 'shared/hooks'
import { Filters } from './Filters'
import { Note } from './Note'
import { NoteForm } from './NoteForm'

export const Notes: FC = () => {
  const { elementVisible, handleHideElement, handleShowElement } =
    useElementVisible()
  const { sendRequest: sendGamesRequest, response: games } = useRequest(
    api.gameAllList
  )
  const { sendRequest: sendHeroesRequest, response: heroes } = useRequest(
    api.heroList
  )
  const { sendRequest: sendTeamsRequest, response: teams } = useRequest(
    api.teamList
  )

  useEffect(() => {
    sendHeroesRequest()
    sendTeamsRequest()
    sendGamesRequest()
  }, [])

  return (
    <>
      <Filters
        isVisible={elementVisible}
        onVisibleElement={handleShowElement}
        heroes={heroes}
        teams={teams}
      />
      {elementVisible && (
        <NoteForm
          onFinishCallback={handleHideElement}
          heroes={heroes}
          teams={teams}
        />
      )}
      {heroes &&
        games?.map(el => <Note game={el} key={el.id} heroes={heroes} />)}
    </>
  )
}
