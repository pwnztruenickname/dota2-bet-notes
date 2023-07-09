import { GameRole } from '@/src/api'
import Carry from '@/public/carry.svg'
import Mid from '@/public/mid.svg'
import Hardlane from '@/public/hard.svg'
import FullSupport from '@/public/fullsupport.svg'
import SemiSupport from '@/public/semisupport.svg'

export const ROLES_LIST = {
  [GameRole.Carry]: Carry,
  [GameRole.Mid]: Mid,
  [GameRole.Hardlane]: Hardlane,
  [GameRole.FullSupport]: FullSupport,
  [GameRole.SemiSupport]: SemiSupport,
}
