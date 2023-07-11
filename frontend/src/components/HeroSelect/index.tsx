import { Select, SelectProps, theme } from 'antd'
import cn from 'classnames'
import { HEROES_IMG_URL } from '@/src/consts'
import s from '@/styles/HeroSelect.module.scss'

export default function HeroSelect({ value, onChange, options, className, ...props }: SelectProps) {
  const { token } = theme.useToken()
  return (
    <div className={s.wrapper}>
      {value ? (
        <div
          className={s.icon}
          style={{
            backgroundImage: `url(${HEROES_IMG_URL}${
              options?.find(el => el.value === value)?.key
            }.png)`,
            borderColor: token.colorBgLayout,
          }}
        />
      ) : (
        <div className={s.placeholder} />
      )}

      <Select
        className={cn(s.select, className)}
        options={options}
        placeholder='Hero'
        onChange={onChange}
        value={value}
        showSearch
        popupMatchSelectWidth={false}
        optionFilterProp='label'
        {...props}
      />
    </div>
  )
}
