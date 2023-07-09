import HeroItem from '@/app/components/HeroItem'
import { GameFullContract } from '@/src/api'
import Block from '@/src/components/Block'
import { Center, Flex, Text, Heading, Grid, GridItem, SimpleGrid } from '@chakra-ui/react'
import s from '@/styles/Note.module.scss'
import CupImg from '@/public/cup.svg'

interface Props {
  game: GameFullContract,
}

export default function Note({ game }: Props) {
  return (
    <Block className={s.wrapper}>
      <Flex gap={3}>
        <div>
          <Heading size='lg' className={s.title}>{game.firstTeam?.team?.name}</Heading>
          <Flex gap={2}>
            {game.firstTeam?.charactersInTeam?.map(el => (
              <HeroItem hero={el} key={el.id} />
            ))}
          </Flex>
        </div>
        <Center>
          <div>{game.gameResult}</div>
          <CupImg className={s.cup} />
        </Center>
        <div>
          <Heading size='lg' className={s.title}>{game.firstTeam?.team?.name}</Heading>
          <Flex gap={2}>
            {game.secondTeam?.charactersInTeam?.map(el => (
              <HeroItem hero={el} key={el.id} />
            ))}
          </Flex>
        </div>
      </Flex>
      <Text className={s.comment}>{game.comment}</Text>
    </Block>
  )
}
