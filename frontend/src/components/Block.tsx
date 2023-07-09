import { PropsWithChildren } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

const baseStyle = {
  p: '10px 15px',
  m: '10px',
  borderRadius: 12,
  border: '1px',
  borderColor: '#303030',
}

interface Props extends BoxProps {}

export default function Block({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <Box sx={baseStyle} {...props} >
      {children}
    </Box>
  )
}
