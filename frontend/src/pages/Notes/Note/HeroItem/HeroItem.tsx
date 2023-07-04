import { FC, memo } from 'react'
import Paragraph from 'antd/es/typography/Paragraph'
import { HEROES_IMG_URL } from 'shared/consts'
import { HeroItemProps } from './HeroItem.model'
import s from './HeroItem.module.scss'

export const HeroItem: FC<HeroItemProps> = memo(({ hero }) => {
  return (
    <div className={s.wrapper}>
      <div
        className={s.icon}
        style={{ backgroundImage: `url(${HEROES_IMG_URL}${hero?.name}.png)` }}
      />

      <Paragraph className={s.name} title={hero?.localizedName || ''}>
        {hero?.localizedName}
      </Paragraph>
    </div>
  )
})
