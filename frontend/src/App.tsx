import 'antd/dist/reset.css'
import './styles/index.scss'
import { FC, useCallback, useEffect, useState } from 'react'
import Icon from '@ant-design/icons'
import { ConfigProvider, FloatButton, theme } from 'antd'
import { Layout } from 'core/components'
import { Notes } from 'pages'
import { ReactComponent as MoonIcon } from 'shared/img/moon-icon.svg'

type ThemeModeType = 'dark' | 'light'

export const App: FC = () => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [themeMode, setThemeMode] = useState<ThemeModeType>('light')

  const changeTheme = useCallback((mode: ThemeModeType) => {
    localStorage.setItem('themeMode', mode)
    setThemeMode(mode)
  }, [])

  const toggleTheme = useCallback(() => {
    const currentTheme = localStorage.getItem('themeMode')
    changeTheme(!currentTheme || currentTheme === 'dark' ? 'light' : 'dark')
  }, [changeTheme])

  useEffect(() => {
    const storedTheme = localStorage.getItem('themeMode')

    if (storedTheme) {
      setThemeMode(storedTheme as ThemeModeType)
    }
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'IBM Plex Sans, sans-serif',
          colorBgLayout: '#1c1c1c',
          colorBgBase: '#111111',
          colorPrimaryBg: '#1f1f1f',
        },
        algorithm: themeMode == 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
        <Notes />
        <FloatButton
          onClick={toggleTheme}
          icon={<Icon component={MoonIcon} />}
        />
      </Layout>
    </ConfigProvider>
  )
}
