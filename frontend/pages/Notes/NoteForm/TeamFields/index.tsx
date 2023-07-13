import { GameCreateContract, HeroContract, TeamContract } from '@/src/api'
import { Form, Select, Space } from 'antd'
import HeroSelect from '@/src/components/HeroSelect'
import ShouldUpdateChecker from '@/src/components/ShouldUpdateChecker'
import { ROLES_LIST } from '@/src/consts'
import s from '@/styles/TeamFields.module.scss'

interface Props {
  mainFieldName: keyof Pick<GameCreateContract, 'radiant' | 'dire'>
  dependFieldName: keyof Pick<GameCreateContract, 'radiant' | 'dire'>
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export default function TeamFields({
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
              placeholder="Dire team"
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
      <Form.List name={[mainFieldName, 'charactersInTeam']}>
        {fields => (
          <Space>
            {fields.map(field => (
              <div key={field.key}>
                <ShouldUpdateChecker
                  fieldPath={[
                    ['radiant', 'charactersInTeam'],
                    ['dire', 'charactersInTeam'],
                  ]}
                >
                  {({ getFieldsValue }) => {
                    const heroFields = getFieldsValue([
                      ['radiant', 'charactersInTeam'],
                      ['dire', 'charactersInTeam'],
                    ])
                    const RoleIcon =
                      ROLES_LIST[
                        heroFields.radiant.charactersInTeam[field.name]
                          .gameRole as keyof typeof ROLES_LIST
                      ]
                    const heroesValue = [
                      ...heroFields.radiant.charactersInTeam,
                      ...heroFields.dire.charactersInTeam,
                    ]
                    const heroOptions = heroes?.map(el => ({
                      label: el.localizedName,
                      value: el.id,
                      key: el.name,
                      disabled: heroesValue.find(hero => hero.id === el.id),
                    }))
                    return (
                      <Form.Item noStyle name={[field.name, 'id']}>
                        <HeroSelect
                          options={heroOptions}
                          suffixIcon={<RoleIcon />}
                        />
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
