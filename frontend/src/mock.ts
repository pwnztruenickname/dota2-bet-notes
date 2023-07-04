import { GameFullContract, HeroContract, TeamSide } from 'shared/api'

export const HEROES_MOCK: HeroContract[] = [
  {
    localizedName: 'Герой1 Герой1 Герой1 Герой1 ',
    id: 1,
  },
  {
    localizedName: 'Герой2',
    id: 2,
  },
  {
    localizedName: 'Герой3',
    id: 3,
  },
  {
    localizedName: 'Герой4',
    id: 4,
  },
  {
    localizedName: 'Герой5',
    id: 5,
  },
  {
    localizedName: 'Герой6',
    id: 6,
  },
  {
    localizedName: 'Герой7',
    id: 7,
  },
  {
    localizedName: 'Герой8',
    id: 8,
  },
  {
    localizedName: 'Герой9',
    id: 9,
  },
  {
    localizedName: 'Герой10',
    id: 10,
  },
  {
    localizedName: 'Герой11',
    id: 11,
  },
]

export const GAMES_MOCK: GameFullContract[] = [
  {
    id: 1,
    firstTeam: {
      team: {
        id: 1,
        name: 'Team1',
      },
      charactersInTeam: [],
      teamSide: TeamSide.Ancient,
    },
    secondTeam: {
      team: {
        id: 2,
        name: 'Team2',
      },
      charactersInTeam: [],
      teamSide: TeamSide.Dire,
    },
    comment:
      'Какой-то комментарий, который очень важен для человека, сохранившего его',
  },
  {
    id: 2,
    firstTeam: {
      team: {
        id: 1,
        name: 'Team1',
      },
      charactersInTeam: [],
      teamSide: TeamSide.Ancient,
    },
    secondTeam: {
      team: {
        id: 2,
        name: 'Team2',
      },
      charactersInTeam: [],
      teamSide: TeamSide.Dire,
    },
    comment:
      'Какой-то комментарий, который очень важен для человека, сохранившего его',
  },
]
