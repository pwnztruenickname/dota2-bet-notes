import { useCallback, useState } from 'react'
import { AxiosResponse } from 'axios'

interface UseRequestReturnType<T, K> {
  response?: K
  sendRequest: (params?: T) => Promise<void>
}

export const useRequest = <T = any, K = any>(
  requestFn: (data: T) => Promise<AxiosResponse<K>>
): UseRequestReturnType<T, K> => {
  const [response, setResponse] = useState<K>()

  const sendRequest = useCallback(
    async (params?: T) => {
      try {
        const { data } = await requestFn(params as T)
        setResponse(data)
      } catch (e) {
        console.error(e)
      } finally {
      }
    },
    [requestFn]
  )

  return { sendRequest, response }
}
