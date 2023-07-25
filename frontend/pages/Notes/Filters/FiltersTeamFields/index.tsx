import { HeroContract, TeamContract } from '@/src/api'
import { Form, Select, Space } from 'antd'
import HeroSelect from '@/src/components/HeroSelect'
import ShouldUpdateChecker from '@/src/components/ShouldUpdateChecker'
import s from '@/styles/FiltersTeamFields.module.scss'
import { upperFirst } from 'lodash'

interface Props {
  mainFieldName: string
  dependFieldName: string
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export default function FiltersTeamFields({
  mainFieldName,
  dependFieldName,
  teams,
  heroes,
}: Props) {
  return (
    <div>
      <ShouldUpdateChecker fieldPath={[dependFieldName, 'teamId']}>
        {({ getFieldValue }) => (
          <Form.Item name={[mainFieldName, 'teamId']} className={s.team}>
            <Select
              optionFilterProp="label"
              placeholder={`${upperFirst(mainFieldName)} team`}
              options={teams?.map(el => ({
                label: el.name,
                value: el.id,
                disabled: getFieldValue([dependFieldName, 'teamId']) === el.id,
              }))}
              showSearch
            />
          </Form.Item>
        )}
      </ShouldUpdateChecker>
      <Form.List name={[mainFieldName, 'setupCharacterIds']}>
        {fields => (
          <Space>
            {fields.map(field => (
              <div key={field.key}>
                <ShouldUpdateChecker
                  fieldPath={[
                    [mainFieldName, 'setupCharacterIds'],
                    [dependFieldName, 'setupCharacterIds'],
                  ]}
                >
                  {({ getFieldsValue }) => {
                    const heroFields = getFieldsValue([
                      [mainFieldName, 'setupCharacterIds'],
                      [dependFieldName, 'setupCharacterIds'],
                    ])
                    const heroesValue = [
                      ...heroFields[mainFieldName].setupCharacterIds,
                      ...heroFields[dependFieldName].setupCharacterIds,
                    ]
                    const heroOptions = heroes?.map(el => ({
                      label: el.localizedName,
                      value: el.id,
                      key: el.name,
                      disabled: heroesValue.find(hero => hero?.id === el.id),
                    }))
                    return (
                      <Form.Item noStyle name={[field.name, 'id']}>
                        <HeroSelect options={heroOptions} />
                      </Form.Item>
                    )
                  }}
                </ShouldUpdateChecker>
              </div>
            ))}
          </Space>
        )}
      </Form.List>
    </div>
  )
}
