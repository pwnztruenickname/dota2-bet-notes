import { FC, Fragment, memo, useCallback } from 'react'
import { Button, Form, Input, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/lib/form/Form'
import { api, GameCreateContract } from 'shared/api'
import { Block, ShouldUpdateChecker, HeroSelect } from 'shared/components'
import { useRequest } from 'shared/hooks'
import { NoteFormProps } from './NoteForm.model'
import s from './NoteForm.module.scss'

export const NoteForm: FC<NoteFormProps> = memo(
  ({ onFinishCallback, heroes }) => {
    const [form] = useForm()
    const { sendRequest } = useRequest(api.gameCreate)

    const handleFinish = useCallback(
      // TODO: переделать контракт создания (убрать id и тп)
      async (values: GameCreateContract) => {
        console.log(values)
        await sendRequest({})
        onFinishCallback()
      },
      [onFinishCallback, sendRequest]
    )

    return (
      <Form
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
                  const heroFields = getFieldValue('teams')
                    // TODO: types
                    .map((el: { heroes: { heroId: number }[] }) =>
                      el.heroes.reduce<number[]>(
                        (acc, el) => (el ? [...acc, el.heroId] : acc),
                        []
                      )
                    )
                    .flat()
                  const heroOptions = heroes?.map(el => ({
                    label: el.localizedName,
                    value: el.id,
                    disabled: heroFields.includes(el.id),
                  }))
                  return (
                    <Space>
                      {fields.map((field, i) => (
                        <Fragment key={field.key}>
                          <div>
                            <Form.Item
                              name={[field.name, 'name']}
                              className={s.title}
                            >
                              <Input placeholder={`Team ${i + 1}`} />
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
