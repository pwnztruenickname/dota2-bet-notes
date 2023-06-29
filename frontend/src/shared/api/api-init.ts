import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import { API_BASE_URL } from 'shared/consts'
import { serviceOptions } from './api'

const httpConfig: AxiosRequestConfig = {
    baseURL: API_BASE_URL,
}

const successResponseInterceptor = (
    response: AxiosResponse
): Promise<AxiosResponse> => Promise.resolve(response)

const failureResponseInterceptor = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error.response)
}

const http: AxiosInstance = axios.create(httpConfig)

http.interceptors.response.use(
    successResponseInterceptor,
    failureResponseInterceptor
)

serviceOptions.axios = http
