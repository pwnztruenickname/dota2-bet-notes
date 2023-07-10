import { FC, memo, useCallback } from 'react'
import { Button, Form, Select, Space } from 'antd'
import { Block, ShouldUpdateChecker, HeroSelect } from 'shared/components'
import { FiltersProps, FormValuesProps } from './Filters.model'
import s from './Filters.module.scss'

export const Filters: FC<FiltersProps> = memo(
  ({ onVisibleElement, isVisible, heroes, teams, onSendGamesRequest }) => {
    const handleFinish = useCallback(
      async ({ teamId, heroes }: FormValuesProps) => {
        await onSendGamesRequest({
          teamId,
          setupCharacterIds: heroes.reduce<number[]>(
            (acc, el) => (el?.heroId ? [...acc, el.heroId] : acc),
            []
          ),
        })
      },
      [onSendGamesRequest]
    )

    return (
      <Block className={s.wrapper}>
        <Button onClick={onVisibleElement} disabled={isVisible}>
          New note
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
                  const heroFields = (
                    getFieldValue('heroes') as FormValuesProps['heroes']
                  )?.reduce<number[]>(
                    (acc, el) => (el?.heroId ? [...acc, el.heroId] : acc),
                    []
                  )
                  const heroOptions = heroes?.map(el => ({
                    label: el.localizedName,
                    value: el.id,
                    key: el.name,
                    // TODO: убрать required
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
              <Select
                optionFilterProp="label"
                placeholder="Team name"
                showSearch
                allowClear
                options={teams?.map(el => ({
                  label: el.name,
                  value: el.id,
                }))}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block className={s.button}>
              Search
            </Button>
          </div>
        </Form>
      </Block>
    )
  }
)
