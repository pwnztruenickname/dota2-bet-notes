import { useCallback, useContext, useState } from 'react'
import { AxiosResponse } from 'axios'
import { LoaderContext } from 'core/contexts'

interface UseRequestReturnType<T extends any[], K> {
  response?: K
  sendRequest: (...args: T) => Promise<void>
}

export const useRequest = <T extends any[], K>(
  requestFn: (...args: T) => Promise<AxiosResponse<K>>
): UseRequestReturnType<T, K> => {
  const { setLoader } = useContext(LoaderContext)
  const [response, setResponse] = useState<K>()

  const sendRequest = useCallback(
    async (...args: T) => {
      try {
        setLoader(true)
        const { data } = await requestFn(...args)
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
