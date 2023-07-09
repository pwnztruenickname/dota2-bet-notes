import { ChakraTheme } from '@chakra-ui/react'

export const theme: Partial<ChakraTheme> = {
  styles: {
    global: {
      body: {
        bg: '#1c1c1c',
      },
    },
  },
  config: { initialColorMode: 'dark' },
}
