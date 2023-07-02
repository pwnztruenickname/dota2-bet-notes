import { HeroContract } from 'shared/api'

export interface NoteFormProps {
  onFinishCallback: () => void
  heroes?: HeroContract[]
}
