import { useCallback, useContext, useState } from 'react'
import { AxiosResponse } from 'axios'
import { LoaderContext } from 'core/contexts'

interface UseRequestReturnType<T, K> {
  response?: K
  sendRequest: (params?: T) => Promise<void>
}

export const useRequest = <T = any, K = any>(
  requestFn: (params: T) => Promise<AxiosResponse<K>>
): UseRequestReturnType<T, K> => {
  const { setLoader } = useContext(LoaderContext)
  const [response, setResponse] = useState<K>()

  const sendRequest = useCallback(
    async (params?: T) => {
      try {
        setLoader(true)
        const { data } = await requestFn(params as T)
        setResponse(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoader(false)
      }
    },
    [requestFn, setLoader]
  )

  return { sendRequest, response }
}
