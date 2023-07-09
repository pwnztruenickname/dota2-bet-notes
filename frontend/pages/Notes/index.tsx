import Filters from '@/pages/Notes/Filters'
import Note from './Note'
import { api } from '@/src/api'
import { useElementVisible, useRequest } from '@/src/hooks'
import { useCallback, useEffect } from 'react'

export default function Notes() {
  const { elementVisible, handleHideElement, handleShowElement } =
    useElementVisible()
  const { sendRequest: sendHeroesRequest, response: heroes } = useRequest(
    api.heroList,
  )
  const { sendRequest: sendTeamsRequest, response: teams } = useRequest(
    api.teamList,
  )

  const { sendRequest: sendGamesRequest, response: games } = useRequest(
    api.gameSearchByCharactersSetupCreate,
  )

  const handleFinish = useCallback(async () => {
    handleHideElement()
    await sendGamesRequest({ teamId: null, setupCharacterIds: [] })
  }, [handleHideElement, sendGamesRequest])

  useEffect(() => {
    sendHeroesRequest()
    sendTeamsRequest()
    sendGamesRequest({ teamId: null, setupCharacterIds: [] })
  }, [sendGamesRequest, sendHeroesRequest, sendTeamsRequest])

  return (
    <>
      <Filters
        onVisibleElement={handleShowElement}
        isVisible={elementVisible}
        heroes={heroes}
        teams={teams}
        onSendGamesRequest={sendGamesRequest}
      />
      {games?.map(el => <Note game={el} key={el.id} />)}
    </>
  )
}
