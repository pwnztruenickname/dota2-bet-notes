import {
  CharacterInTeamCreateContract,
  GameCreateContract,
  HeroContract,
  TeamContract,
} from 'shared/api'

export interface NoteFormProps {
  onFinishCallback: () => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export interface NoteFormValuesProps
  extends Omit<GameCreateContract, 'firstTeam' | 'secondTeam'> {
  teams: {
    teamId: number
    charactersInTeam: CharacterInTeamCreateContract[]
  }[]
}
