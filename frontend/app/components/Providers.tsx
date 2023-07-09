'use client'
import { theme } from '@/src/consts/theme.consts'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ChakraProvider theme={extendTheme(theme)}>
      {children}
    </ChakraProvider>
  )
}
