import Paragraph from 'antd/es/typography/Paragraph'
import { FC, memo } from 'react'
import { HeroItemProps } from './HeroItem.model'
import s from './HeroItem.module.scss'

export const HeroItem: FC<HeroItemProps> = memo(({ hero }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.icon} style={{ backgroundImage: `url(${hero.url})` }} />

      <Paragraph className={s.name} title={hero.label}>
        {hero.label}
      </Paragraph>
    </div>
  )
})
