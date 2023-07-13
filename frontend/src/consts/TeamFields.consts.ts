import { ROLES_LIST } from '@/src/consts'

export const INITIAL_VALUES = {
  radiant: {
    charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
      gameRole: el,
    })),
  },
  dire: {
    charactersInTeam: Object.keys(ROLES_LIST).map(el => ({
      gameRole: el,
    })),
  },
}
