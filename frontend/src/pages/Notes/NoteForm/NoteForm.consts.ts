import { GameRole } from 'shared/api'
import { ReactComponent as CarryIcon } from 'shared/img/carry.svg'
import { ReactComponent as MidIcon } from 'shared/img/mid.svg'
import { ReactComponent as HardlaneIcon } from 'shared/img/hard.svg'
import { ReactComponent as FullSupportIcon } from 'shared/img/fullsupport.svg'
import { ReactComponent as SemiSupportIcon } from 'shared/img/semisupport.svg'

export const ROLES_LIST = {
  [GameRole.Carry]: CarryIcon,
  [GameRole.Mid]: MidIcon,
  [GameRole.Hardlane]: HardlaneIcon,
  [GameRole.FullSupport]: FullSupportIcon,
  [GameRole.SemiSupport]: SemiSupportIcon,
}

export const INITIAL_VALUES = {
  teams: [
    {
      charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
        role: el,
      })),
    },
    {
      charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
        role: el,
      })),
    },
  ],
}
