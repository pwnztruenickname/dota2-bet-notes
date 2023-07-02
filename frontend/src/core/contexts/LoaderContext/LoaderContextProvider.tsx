import { Spin } from 'antd'
import { FC, PropsWithChildren, memo, useCallback, useState } from 'react'
import { LoaderContext } from './LoaderContext'

export const LoaderContextProvider: FC<PropsWithChildren> = memo(props => {
  const { children } = props
  const [loaderCount, setLoaderCount] = useState(0)

  const handleLoader = useCallback((value: boolean) => {
    const action = value ? 1 : -1
    setLoaderCount(prevState => prevState + action)
  }, [])

  return (
    <LoaderContext.Provider
      value={{ isLoader: !!loaderCount, setLoader: handleLoader }}
    >
      <Spin spinning={!!loaderCount} size="large">
        {children}
      </Spin>
    </LoaderContext.Provider>
  )
})
