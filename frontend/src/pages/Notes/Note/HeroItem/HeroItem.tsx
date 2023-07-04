import { FC, memo } from 'react'
import Paragraph from 'antd/es/typography/Paragraph'
import { HeroItemProps } from './HeroItem.model'
import s from './HeroItem.module.scss'

export const HeroItem: FC<HeroItemProps> = memo(({ hero }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.icon} style={{ backgroundImage: `url(${''})` }} />

      <Paragraph className={s.name} title={hero?.localizedName || ''}>
        {hero?.localizedName}
      </Paragraph>
    </div>
  )
})
