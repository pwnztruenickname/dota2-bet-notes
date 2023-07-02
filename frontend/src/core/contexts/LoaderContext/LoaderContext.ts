import { createContext } from 'react'
import { LoaderContextProps } from './LoaderContext.model'

export const LoaderContext = createContext<LoaderContextProps>({
  isLoader: false,
  setLoader: () => {
    throw new Error('Контекст не подключен')
  },
})
