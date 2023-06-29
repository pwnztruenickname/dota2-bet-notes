import { Button, Form, Select, Space } from 'antd'
import { FC, memo } from 'react'
import { Block, ShouldUpdateChecker } from 'shared/components'
import { HeroSelect } from '../NoteForm/HeroSelect'
import { FiltersProps } from './Filters.model'
import s from './Filters.module.scss'

export const Filters: FC<FiltersProps> = memo(
  ({ onVisibleElement, isVisible, heroes }) => {
    return (
      <Block className={s.wrapper}>
        <Button onClick={onVisibleElement} disabled={isVisible}>
          Новый матч
        </Button>
        <Form
          initialValues={{ heroes: new Array(5).fill(undefined) }}
          layout="inline"
          className={s.form}
        >
          <Form.List name="heroes">
            {fields => (
              <ShouldUpdateChecker fieldPath="heroes">
                {({ getFieldValue }) => {
                  const heroFields = getFieldValue('heroes').reduce(
                    (acc: any, el: any) => (el ? [...acc, el.heroId] : acc),
                    []
                  )
                  const heroOptions = heroes?.map(el => ({
                    ...el,
                    disabled: heroFields.includes(el.value),
                  }))
                  return (
                    <Space size={0}>
                      {fields.map(field => (
                        <Form.Item
                          key={field.key}
                          name={[field.name, 'heroId']}
                        >
                          <HeroSelect options={heroOptions} />
                        </Form.Item>
                      ))}
                    </Space>
                  )
                }}
              </ShouldUpdateChecker>
            )}
          </Form.List>
          <div>
            <Form.Item name="team" className={s.team}>
              <Select placeholder="Team name" showSearch />
            </Form.Item>
            <Button type="primary" htmlType="submit" block className={s.button}>
              Поиск
            </Button>
          </div>
        </Form>
      </Block>
    )
  }
)
