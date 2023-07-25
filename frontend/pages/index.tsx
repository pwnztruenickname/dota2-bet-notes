import Notes from '@/pages/Notes'
import { api, GameFullContract, HeroContract, TeamContract } from '@/src/api'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

interface Props {
  heroes: HeroContract[]
  teams: TeamContract[]
  initialGames: GameFullContract[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data: heroes } = await api.heroList()
  const { data: teams } = await api.teamList()
  const { data: initialGames } = await api.gameSearchByCharactersSetupCreate({
    teamId: null,
    setupCharacterIds: [],
  })
  return { props: { heroes, teams, initialGames } }
}

export default function App({
  heroes,
  teams,
  initialGames,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Notes heroes={heroes} teams={teams} initialGames={initialGames} />
}
