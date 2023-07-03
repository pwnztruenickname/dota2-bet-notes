import { FC, memo } from 'react'
import { Select } from 'antd'
import cn from 'classnames'
import { HEROES_IMG_URL } from 'shared/consts'
import { HeroSelectProps } from './HeroSelect.model'
import s from './HeroSelect.module.scss'

export const HeroSelect: FC<HeroSelectProps> = memo(
  ({ value, onChange, options, className, ...props }) => {
    return (
      <div className={s.wrapper}>
        {value ? (
          <div
            className={s.icon}
            style={{
              backgroundImage: `url(${HEROES_IMG_URL}${
                options?.find(el => el.value === value)?.key
              })`,
            }}
          />
        ) : (
          <div className={s.placeholder} />
        )}

        <Select
          className={cn(s.select, className)}
          options={options}
          placeholder="Hero"
          onChange={onChange}
          value={value}
          showSearch
          {...props}
        />
      </div>
    )
  }
)
