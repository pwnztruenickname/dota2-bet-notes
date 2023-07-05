import { FC, Fragment, memo, useCallback } from 'react'
import { Button, Form, Select, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/lib/form/Form'
import {
  api,
  CharacterInTeamCreateContract,
  TeamInGameCreateContract,
  TeamSide,
} from 'shared/api'
import { Block, HeroSelect, ShouldUpdateChecker } from 'shared/components'
import { useRequest } from 'shared/hooks'
import { NoteFormProps, NoteFormValuesProps } from './NoteForm.model'
import s from './NoteForm.module.scss'

export const NoteForm: FC<NoteFormProps> = memo(
  ({ onFinishCallback, heroes, teams }) => {
    const [form] = useForm()
    const { sendRequest } = useRequest(api.gameCreate)

    const handleFinish = useCallback(
      async ({ teams, ...values }: NoteFormValuesProps) => {
        const teamsData: TeamInGameCreateContract[] = teams.map(
          ({ teamId, heroes }, i) => ({
            teamId,
            charactersInTeam: heroes.reduce<CharacterInTeamCreateContract[]>(
              (acc, el) => (el ? [...acc, { id: el.heroId }] : acc),
              []
            ),
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
        initialValues={{
          teams: [
            { heroes: new Array(5).fill(undefined) },
            { heroes: new Array(5).fill(undefined) },
          ],
        }}
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
                      el.heroes.reduce<number[]>(
                        (acc, el) => (el ? [...acc, el.heroId] : acc),
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
                            <Form.List name={[field.name, 'heroes']}>
                              {fields => (
                                <Space>
                                  {fields.map(hero => (
                                    <Form.Item
                                      noStyle
                                      name={[hero.name, 'heroId']}
                                      key={hero.key}
                                    >
                                      <HeroSelect options={heroOptions} />
                                    </Form.Item>
                                  ))}
                                </Space>
                              )}
                            </Form.List>
                          </div>
                          {!i && <Typography.Text>&mdash;</Typography.Text>}
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
              <TextArea rows={4} placeholder="Comment" />
            </Form.Item>
            <Button.Group className={s.buttons}>
              <Button block htmlType="reset" onClick={onFinishCallback}>
                Отмена
              </Button>
              <Button block htmlType="submit" type="primary">
                Сохранить
              </Button>
            </Button.Group>
          </div>
        </Block>
      </Form>
    )
  }
)
