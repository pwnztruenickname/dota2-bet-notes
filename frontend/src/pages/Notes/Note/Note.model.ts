import { GameFullContract, HeroContract } from 'shared/api'

export interface NoteProps {
  game: GameFullContract
  heroes: HeroContract[]
}
