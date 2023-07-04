import { APP_API_HOST } from 'shared/consts'
import { Api } from './api'

export const { api } = new Api({ baseURL: APP_API_HOST })
