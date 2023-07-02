/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean
  showError?: boolean
}

export interface IRequestConfig {
  method?: any
  headers?: any
  url?: any
  data?: any
  params?: any
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance
  /** only in axios interceptor config*/
  loading: boolean
  showError: boolean
}

// Add default options
export const serviceOptions: ServiceOptions = {}

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  } else {
    throw new Error('please inject yourself instance like axios  ')
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any
): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url,
  }
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType,
  }
  return configs
}

export const basePath = ''

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[]
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[]
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number
  items?: T[]
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number
  items?: T[]
}

// customer definition
// empty

export interface CharacterInTeamContract {
  /**  */
  id?: number

  /**  */
  gameRole?: GameRole

  /**  */
  hero?: HeroContract

  /**  */
  characterId?: number

  /**  */
  teamInGameId?: number
}

export interface CharacterInTeamCreateContract {
  /**  */
  id?: number

  /**  */
  gameRole?: GameRole
}

export interface GameCreateContract {
  /**  */
  firstTeam?: TeamInGameCreateContract

  /**  */
  secondTeam?: TeamInGameCreateContract

  /**  */
  comment?: string

  /**  */
  gameResult?: GameResult
}

export interface GameFullContract {
  /**  */
  id?: number

  /**  */
  firstTeam?: TeamInGameContract

  /**  */
  secondTeam?: TeamInGameContract

  /**  */
  comment?: string

  /**  */
  gameResult?: GameResult
}

export interface GameWithCharacterSetupSearchContract {
  /**  */
  teamId?: number

  /**  */
  setupCharacterIds?: number[]
}

export interface HeroContract {
  /**  */
  id?: number

  /**  */
  localizedName?: string

  /**  */
  name?: string
}

export interface SetGameCommentContract {
  /**  */
  comment?: string

  /**  */
  gameId?: string
}

export interface TeamContract {
  /**  */
  id?: number

  /**  */
  name?: string
}

export interface TeamInGameContract {
  /**  */
  teamSide?: TeamSide

  /**  */
  charactersInTeam?: CharacterInTeamContract[]
}

export interface TeamInGameCreateContract {
  /**  */
  teamId?: number

  /**  */
  teamSide?: TeamSide

  /**  */
  charactersInTeam?: CharacterInTeamCreateContract[]
}

export type GameResult = 0 | 1

export type GameRole = 0 | 1 | 2 | 3 | 4

export type TeamSide = 0 | 1
