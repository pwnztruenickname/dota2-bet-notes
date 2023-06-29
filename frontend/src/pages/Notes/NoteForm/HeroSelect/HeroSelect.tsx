import { Form, Select } from 'antd'
import { useWatch } from 'antd/lib/form/Form'
import { FC, memo } from 'react'
import { HeroSelectProps } from './HeroSelect.model'
import s from './HeroSelect.module.scss'
import mock from './mock.png'

export const HeroSelect: FC<HeroSelectProps> = memo(
  ({ heroes, teamFieldName, fieldName, form }) => {
    const heroId = useWatch(
      ['teams', teamFieldName, 'heroes', fieldName, 'heroId'],
      form
    )

    return (
      <div>
        {heroId ? (
          <div
            className={s.icon}
            style={{
              backgroundImage: `url(${
                heroes.find(el => el.value === heroId)?.url
              })`,
            }}
          />
        ) : (
          <div className={s.placeholder}>
            <img src={mock} alt="" />
          </div>
        )}

        <Form.Item noStyle name={[fieldName, 'heroId']}>
          <Select className={s.select} options={heroes} placeholder="Hero" />
        </Form.Item>
      </div>
    )
  }
)
