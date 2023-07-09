import { APP_API_HOST } from '@/src/consts'
import { Api } from './api'

export const { api } = new Api({ baseURL: APP_API_HOST })
