import { ROLES_LIST } from '@/src/consts'
import { INITIAL_VALUES } from './consts'
import { Fragment, useCallback } from 'react'
import { Button, Form, Select, Space, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import {
  api,
  CharacterInTeamCreateContract, GameCreateContract, HeroContract, TeamContract,
  TeamInGameCreateContract,
  TeamSide,
} from '@/src/api'
import ShouldUpdateChecker from '@/src/components/ShouldUpdateChecker'
import Block from '@/src/components/Block'
import HeroSelect from '@/src/components/HeroSelect'
import { useRequest } from '@/src/hooks'
import s from '@/styles/NoteForm.module.scss'

interface NoteFormValuesProps extends Omit<GameCreateContract, 'firstTeam' | 'secondTeam'> {
  teams: {
    teamId: number
    charactersInTeam: CharacterInTeamCreateContract[]
  }[]
}

interface Props {
  onFinishCallback: () => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export default function NoteForm ({ onFinishCallback, heroes, teams }: Props) {
    const [form] = useForm()
    const { sendRequest } = useRequest(api.gameCreate)

    const handleFinish = useCallback(
      async ({ teams, ...values }: NoteFormValuesProps) => {
        const teamsData: TeamInGameCreateContract[] = teams.map(
          ({ teamId, charactersInTeam }, i) => ({
            teamId,
            charactersInTeam: charactersInTeam.reduce<
              CharacterInTeamCreateContract[]
            >((acc, el) => (el.id ? [...acc, el] : acc), []),
            teamSide: i ? TeamSide.Dire : TeamSide.Ancient,
          })
        )
        sendRequest({
          ...values,
          firstTeam: teamsData[0],
          secondTeam: teamsData[1],
        }).then(() => {
          onFinishCallback()
        })
      },
      [onFinishCallback, sendRequest]
    )

    return (
      <Form<NoteFormValuesProps>
        form={form}
        onFinish={handleFinish}
        initialValues={INITIAL_VALUES}
      >
        <Block className={s.wrapper}>
          <Form.List name="teams">
            {fields => (
              <ShouldUpdateChecker fieldPath="teams">
                {({ getFieldValue }) => {
                  const fieldsValue = getFieldValue(
                    'teams'
                  ) as NoteFormValuesProps['teams']
                  const heroFields = fieldsValue
                    .map(el =>
                      el.charactersInTeam.reduce<number[]>(
                        (acc, el) => (el?.id ? [...acc, el.id] : acc),
                        []
                      )
                    )
                    .flat()
                  const heroOptions = heroes?.map(el => ({
                    label: el.localizedName,
                    value: el.id,
                    key: el.name,
                    // TODO: убрать required
                    disabled: heroFields.includes(el.id!),
                  }))
                  return (
                    <Space>
                      {fields.map((field, i) => (
                        <Fragment key={field.key}>
                          <div>
                            <Form.Item
                              name={[field.name, 'teamId']}
                              className={s.team}
                            >
                              <Select
                                optionFilterProp="label"
                                placeholder={`Team ${i + 1}`}
                                options={teams?.map(el => ({
                                  label: el.name,
                                  value: el.id,
                                  disabled: fieldsValue.some(
                                    team => team?.teamId === el.id
                                  ),
                                }))}
                                showSearch
                              />
                            </Form.Item>
                            <Form.List name={[field.name, 'charactersInTeam']}>
                              {fields => (
                                <Space>
                                  {fields.map(hero => (
                                    <div key={hero.key}>
                                      <ShouldUpdateChecker
                                        fieldPath={[
                                          'teams',
                                          field.name,
                                          'charactersInTeam',
                                          hero.name,
                                          'gameRole',
                                        ]}
                                      >
                                        {({ getFieldValue }) => {
                                          const RoleIcon =
                                            ROLES_LIST[
                                              getFieldValue([
                                                'teams',
                                                field.name,
                                                'charactersInTeam',
                                                hero.name,
                                                'gameRole',
                                              ]) as keyof typeof ROLES_LIST
                                            ]
                                          return (
                                            <Form.Item
                                              noStyle
                                              name={[hero.name, 'id']}
                                            >
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
                        </Fragment>
                      ))}
                    </Space>
                  )
                }}
              </ShouldUpdateChecker>
            )}
          </Form.List>
          <div>
            <Form.Item noStyle name="comment">
              <Input.TextArea rows={4} placeholder="Comment" />
            </Form.Item>
            <Button.Group className={s.buttons}>
              <Button block htmlType="reset" onClick={onFinishCallback}>
                Cancel
              </Button>
              <Button block htmlType="submit" type="primary">
                Save
              </Button>
            </Button.Group>
          </div>
        </Block>
      </Form>
    )
  }
