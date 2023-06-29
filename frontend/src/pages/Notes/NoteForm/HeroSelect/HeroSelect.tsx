import { Select } from 'antd'
import cn from 'classnames'
import { FC, memo } from 'react'
import { HeroSelectProps } from './HeroSelect.model'
import s from './HeroSelect.module.scss'
import mock from './mock.png'

export const HeroSelect: FC<HeroSelectProps> = memo(
  ({ value, onChange, options, className, ...props }) => {
    return (
      <div className={s.wrapper}>
        {value ? (
          <div
            className={s.icon}
            style={{
              backgroundImage: `url(${
                options?.find(el => el.value === value)?.url
              })`,
            }}
          />
        ) : (
          <div className={s.placeholder}>
            <img src={mock} alt="" />
          </div>
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
