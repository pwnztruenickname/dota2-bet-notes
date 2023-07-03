import {
  GameWithCharacterSetupSearchContract,
  HeroContract,
  TeamContract,
} from 'shared/api'

export interface FiltersProps {
  isVisible: boolean
  onVisibleElement: () => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

interface HeroesProps {
  heroId: number
}

export interface FormValuesProps
  extends Pick<GameWithCharacterSetupSearchContract, 'teamId'> {
  heroes: HeroesProps[]
}
