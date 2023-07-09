'use client'
import Filters from '@/app/components/Filters'
import Note from '@/app/components/Note'
import { api } from '@/src/api'
import { useRequest } from '@/src/hooks'
import { useDisclosure } from '@chakra-ui/react'
import { useCallback, useEffect } from 'react'

export default function Notes() {
  const { isOpen, onClose, onOpen } = useDisclosure()
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
    onClose()
    await sendGamesRequest({ teamId: null, setupCharacterIds: [] })
  }, [sendGamesRequest, onClose])

  useEffect(() => {
    sendHeroesRequest()
    sendTeamsRequest()
    sendGamesRequest({ teamId: null, setupCharacterIds: [] })
  }, [sendGamesRequest, sendHeroesRequest, sendTeamsRequest])

  return (
    <>
      <Filters onOpen={onOpen} isVisible={isOpen} heroes={heroes} teams={teams} onSendGamesRequest={handleFinish} />
      {games?.map(el => <Note game={el} key={el.id} />)}
    </>
  )
}
