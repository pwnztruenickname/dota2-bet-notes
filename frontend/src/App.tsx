import 'antd/dist/reset.css'
import './styles/index.scss'
import Icon from '@ant-design/icons'
import { ConfigProvider, FloatButton, Layout, theme } from 'antd'
import { FC, useCallback, useEffect, useState } from 'react'
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
        },
        algorithm: themeMode == 'dark' ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Layout>
        <Layout.Content>
          <Notes />
          <FloatButton
            onClick={toggleTheme}
            icon={<Icon component={MoonIcon} />}
          />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  )
}
