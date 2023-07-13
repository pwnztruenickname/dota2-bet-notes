/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CharacterInTeamContract {
  /** @format int64 */
  id?: number
  gameRole?: GameRole
  hero?: HeroContract
  /** @format int64 */
  characterId?: number
  /** @format int64 */
  teamInGameId?: number
}

export interface CharacterInTeamCreateContract {
  /** @format int64 */
  id?: number
  gameRole?: GameRole
}

export interface GameCreateContract {
  radiant?: TeamInGameCreateContract
  dire?: TeamInGameCreateContract
  comment?: string
  gameResult?: GameResult
}

export interface GameFullContract {
  /** @format int64 */
  id?: number
  radiant?: TeamInGameContract
  dire?: TeamInGameContract
  comment?: string
  gameResult?: GameResult
}

export enum GameResult {
  DireWin = 'DireWin',
  RadiantWin = 'RadiantWin',
}

export enum GameRole {
  FullSupport = 'FullSupport',
  SemiSupport = 'SemiSupport',
  Carry = 'Carry',
  Mid = 'Mid',
  Hardlane = 'Hardlane',
}

export interface GameWithCharacterSetupSearchContract {
  /** @format int64 */
  teamId?: number | null
  setupCharacterIds?: number[]
}

export interface HeroContract {
  /** @format int64 */
  id?: number
  localizedName?: string
  name?: string
}

export interface SetGameCommentContract {
  comment?: string
  gameId?: string
}

export interface TeamContract {
  /** @format int64 */
  id?: number
  name?: string
}

export interface TeamInGameContract {
  team?: TeamContract
  charactersInTeam?: CharacterInTeamContract[]
}

export interface TeamInGameCreateContract {
  /** @format int64 */
  teamId?: number
  charactersInTeam?: CharacterInTeamCreateContract[]
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios'

export type QueryParamsType = Record<string | number, any>

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType
  /** request body */
  body?: unknown
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void
  secure?: boolean
  format?: ResponseType
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private secure?: boolean
  private format?: ResponseType

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    })
    this.secure = secure
    this.format = format
    this.securityWorker = securityWorker
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method)

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem)
    } else {
      return `${formItem}`
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key]
      const propertyContent: any[] =
        property instanceof Array ? property : [property]

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        )
      }

      return formData
    }, new FormData())
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const responseFormat = format || this.format || undefined

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>)
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body)
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    })
  }
}

/**
 * @title DotaStatistics
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Game
     * @name GameSearchByCharactersSetupCreate
     * @request POST:/api/Game/search-by-characters-setup
     */
    gameSearchByCharactersSetupCreate: (
      data: GameWithCharacterSetupSearchContract,
      params: RequestParams = {}
    ) =>
      this.request<GameFullContract[], any>({
        path: `/api/Game/search-by-characters-setup`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameCreate
     * @request POST:/api/Game
     */
    gameCreate: (data: GameCreateContract, params: RequestParams = {}) =>
      this.request<GameCreateContract, any>({
        path: `/api/Game`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameAllList
     * @request GET:/api/Game/all
     */
    gameAllList: (params: RequestParams = {}) =>
      this.request<GameFullContract[], any>({
        path: `/api/Game/all`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Game
     * @name GameSetCommentCreate
     * @request POST:/api/Game/set-comment
     */
    gameSetCommentCreate: (
      data: SetGameCommentContract,
      params: RequestParams = {}
    ) =>
      this.request<void, any>({
        path: `/api/Game/set-comment`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hero
     * @name HeroList
     * @request GET:/api/Hero
     */
    heroList: (params: RequestParams = {}) =>
      this.request<HeroContract[], any>({
        path: `/api/Hero`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Hero
     * @name HeroSyncUpdate
     * @request PUT:/api/Hero/sync
     */
    heroSyncUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Hero/sync`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamSyncUpdate
     * @request PUT:/api/Team/sync
     */
    teamSyncUpdate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Team/sync`,
        method: 'PUT',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Team
     * @name TeamList
     * @request GET:/api/Team
     */
    teamList: (params: RequestParams = {}) =>
      this.request<TeamContract[], any>({
        path: `/api/Team`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  }
}
