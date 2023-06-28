import { Select } from 'antd'
import { FC, memo } from 'react'
import { HeroSelectProps } from './HeroSelect.model'
import s from './HeroSelect.module.scss'

export const HeroSelect: FC<HeroSelectProps> = memo(({ heroes, heroId }) => {

  return (
    <div>
      <div
        className={s.icon}
        style={{ backgroundImage: `url(${heroes.find(el => el.value === heroId)?.url})`}}
      />

      <Select
        className={s.select}
        options={heroes}
        defaultValue={heroId}
      />
    </div>
  )
})
