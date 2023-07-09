import { GameWithCharacterSetupSearchContract, HeroContract, TeamContract } from '@/src/api'
import Block from '@/src/components/Block'
import { Button, Flex, Spacer } from '@chakra-ui/react'
import s from '@/styles/Filters.module.scss'

interface Props {
  isVisible: boolean
  onOpen: () => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
  onSendGamesRequest: (values: GameWithCharacterSetupSearchContract) => void
}

export default function Filters({ onOpen, isVisible, heroes, teams, onSendGamesRequest }: Props) {

  return (
    <Block>
      <Flex>
        <Button onClick={onOpen} disabled={isVisible}>
          New note
        </Button>
        <Spacer/>
        <Button>
          Search
        </Button>
      </Flex>
    </Block>
  )
}
