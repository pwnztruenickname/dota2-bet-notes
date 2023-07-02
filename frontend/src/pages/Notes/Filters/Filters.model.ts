import { GameWithCharacterSetupSearchContract, HeroContract } from 'shared/api'

export interface FiltersProps {
  isVisible: boolean
  onVisibleElement: () => void
  heroes?: HeroContract[]
}

export interface FormValuesProps
  extends Pick<GameWithCharacterSetupSearchContract, 'teamId'> {
  heroes: { heroId: number }[]
}
