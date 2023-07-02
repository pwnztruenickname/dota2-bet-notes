import { Button, Form, Select, Space } from 'antd'
import { FC, memo, useCallback } from 'react'
import { Block, ShouldUpdateChecker, HeroSelect } from 'shared/components'
import { api } from 'shared/api'
import { useRequest } from 'shared/hooks'
import { FiltersProps, FormValuesProps } from './Filters.model'
import s from './Filters.module.scss'

export const Filters: FC<FiltersProps> = memo(
  ({ onVisibleElement, isVisible, heroes }) => {
    // TODO: наверно POST?
    const { sendRequest } = useRequest(api.gameSearchByCharactersSetupList)

    const handleFinish = useCallback(
      async ({ teamId, heroes }: FormValuesProps) => {
        await sendRequest({
          teamId,
          setupCharacterIds: heroes.reduce<number[]>(
            (acc, el) => (el ? [...acc, el?.heroId] : acc),
            []
          ),
        })
      },
      [sendRequest]
    )

    return (
      <Block className={s.wrapper}>
        <Button onClick={onVisibleElement} disabled={isVisible}>
          Новый матч
        </Button>
        <Form<FormValuesProps>
          initialValues={{ heroes: new Array(5).fill(undefined) }}
          layout="inline"
          className={s.form}
          onFinish={handleFinish}
        >
          <Form.List name="heroes">
            {fields => (
              <ShouldUpdateChecker fieldPath="heroes">
                {({ getFieldValue }) => {
                  // TODO: types
                  const heroFields = (
                    getFieldValue('heroes') as { heroId: number }[]
                  )?.reduce<number[]>(
                    (acc, el) => (el ? [...acc, el.heroId] : acc),
                    []
                  )
                  const heroOptions = heroes?.map(el => ({
                    label: el.localizedName,
                    value: el.id,
                    // TODO: id может быть undefined?
                    disabled: heroFields.includes(el.id!),
                  }))
                  return (
                    <Space size={0}>
                      {fields.map(field => (
                        <Form.Item
                          key={field.key}
                          name={[field.name, 'heroId']}
                        >
                          <HeroSelect options={heroOptions} allowClear />
                        </Form.Item>
                      ))}
                    </Space>
                  )
                }}
              </ShouldUpdateChecker>
            )}
          </Form.List>
          <div>
            <Form.Item name="teamId" className={s.team}>
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
