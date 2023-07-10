import { FC, memo } from 'react'
import { theme } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { HEROES_IMG_URL } from 'shared/consts'
import { HeroItemProps } from './HeroItem.model'
import s from './HeroItem.module.scss'

export const HeroItem: FC<HeroItemProps> = memo(
  ({ hero, roleIcon: RoleIcon }) => {
    const { token } = theme.useToken()
    return (
      <div className={s.wrapper}>
        <RoleIcon
          className={s.role}
          style={{
            borderColor: token.colorError,
            backgroundColor: token.colorBgLayout,
          }}
        />
        <div
          className={s.icon}
          style={{
            backgroundImage: `url(${HEROES_IMG_URL}${hero?.name}.png)`,
            borderColor: token.colorBgLayout,
          }}
        />

        <Paragraph className={s.name} title={hero?.localizedName || ''}>
          {hero?.localizedName}
        </Paragraph>
      </div>
    )
  }
)
