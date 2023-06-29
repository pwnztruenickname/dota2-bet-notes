import { FC, memo } from 'react'
import { HeroItemProps } from './HeroItem.model'
import s from './HeroItem.module.scss'

export const HeroItem: FC<HeroItemProps> = memo(({ hero }) => {
  return (
    <div>
      <div className={s.icon} style={{ backgroundImage: `url(${hero.url})` }} />

      <div className={s.name} title={hero.label}>
        {hero.label}
      </div>
    </div>
  )
})
