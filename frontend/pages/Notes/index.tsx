import Filters from '@/pages/Notes/Filters'
import NoteForm from '@/pages/Notes/NoteForm'
import Note from './Note'
import { api, GameFullContract, HeroContract, TeamContract } from '@/src/api'
import { useElementVisible, useRequest } from '@/src/hooks'
import { useCallback } from 'react'

interface Props {
  heroes: HeroContract[]
  teams: TeamContract[]
  initialGames: GameFullContract[]
}

export default function Notes({ heroes, teams, initialGames }: Props) {
  const { elementVisible, handleHideElement, handleShowElement } =
    useElementVisible()
  const { sendRequest: sendGamesRequest, response: games } = useRequest(
    api.gameSearchByCharactersSetupCreate
  )

  const handleFinish = useCallback(async () => {
    handleHideElement()
    await sendGamesRequest({ teamId: null, setupCharacterIds: [] })
  }, [handleHideElement, sendGamesRequest])

  return (
    <>
      <Filters
        onVisibleElement={handleShowElement}
        isVisible={elementVisible}
        heroes={heroes}
        teams={teams}
        onSendGamesRequest={sendGamesRequest}
      />
      {elementVisible && (
        <NoteForm
          onFinishCallback={handleFinish}
          heroes={heroes}
          teams={teams}
        />
      )}
      {(games || initialGames)?.map(el => (
        <Note game={el} key={el.id} />
      ))}
    </>
  )
}
