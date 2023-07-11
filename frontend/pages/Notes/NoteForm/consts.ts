import { ROLES_LIST } from '@/src/consts'

export const INITIAL_VALUES = {
  teams: [
    {
      charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
        gameRole: el,
      })),
    },
    {
      charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
        gameRole: el,
      })),
    },
  ],
}
