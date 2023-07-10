import {
  GameWithCharacterSetupSearchContract,
  HeroContract,
  TeamContract,
} from '@/src/api'
import { useCallback } from 'react'
import { Button, Form, Select, Space } from 'antd'
import Block from '@/src/components/Block'
import ShouldUpdateChecker from '@/src/components/ShouldUpdateChecker'
import s from '@/styles/Filters.module.scss'
import HeroSelect from '@/src/components/HeroSelect'

interface HeroesProps {
  heroId: number
}

interface FormValuesProps
  extends Pick<GameWithCharacterSetupSearchContract, 'teamId'> {
  setupCharacterIds: HeroesProps[]
}

interface Props {
  isVisible: boolean
  onVisibleElement: () => void
  onSendGamesRequest: (values: GameWithCharacterSetupSearchContract) => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export default function Filters({
  onVisibleElement,
  isVisible,
  heroes,
  teams,
  onSendGamesRequest,
}: Props) {
  const handleFinish = useCallback(
    async ({ teamId, setupCharacterIds }: FormValuesProps) => {
      await onSendGamesRequest({
        teamId,
        setupCharacterIds: setupCharacterIds.reduce<number[]>(
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
        initialValues={{ setupCharacterIds: new Array(5).fill(undefined) }}
        layout="inline"
        className={s.form}
        onFinish={handleFinish}
      >
        <Form.List name="setupCharacterIds">
          {fields => (
            <ShouldUpdateChecker fieldPath="setupCharacterIds">
              {({ getFieldValue }) => {
                const heroFields = (
                  getFieldValue(
                    'setupCharacterIds'
                  ) as FormValuesProps['setupCharacterIds']
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
                      <Form.Item key={field.key} name={[field.name, 'heroId']}>
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
