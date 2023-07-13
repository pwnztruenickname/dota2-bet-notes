import React, { JSX } from 'react'
import { ConfigProvider, theme } from 'antd'
import enUS from 'antd/locale/en_US'

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          fontFamily: 'IBM Plex Sans, sans-serif',
          colorBgLayout: '#1c1c1c',
          colorBgBase: '#111111',
          colorPrimaryBg: '#1f1f1f',
        },
      }}
    >
      {node}
    </ConfigProvider>
  </>
)

export default withTheme
