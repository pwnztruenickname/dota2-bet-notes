import 'antd/dist/reset.css'
import './styles/index.scss'
import { FC } from 'react'
import { ConfigProvider, theme } from 'antd'
import { Layout } from 'core/components'
import { Notes } from 'pages'

export const App: FC = () => {
  const { darkAlgorithm } = theme

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'IBM Plex Sans, sans-serif',
          colorBgLayout: '#1c1c1c',
          colorBgBase: '#111111',
          colorPrimaryBg: '#1f1f1f',
        },
        algorithm: darkAlgorithm,
      }}
    >
      <Layout>
        <Notes />
      </Layout>
    </ConfigProvider>
  )
}
