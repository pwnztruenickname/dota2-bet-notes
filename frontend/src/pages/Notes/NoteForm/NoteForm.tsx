import { Button, Form, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/lib/form/Form'
import { FC, Fragment, memo, useCallback } from 'react'
import { Block, ShouldUpdateChecker } from 'shared/components'
import { HeroSelect } from './HeroSelect'
import { NoteFormProps } from './NoteForm.model'
import s from './NoteForm.module.scss'

export const NoteForm: FC<NoteFormProps> = memo(
  ({ onFinishCallback, heroes }) => {
    const [form] = useForm()

    // TODO: any
    const handleFinish = useCallback(
      (values: any) => {
        console.log(values)
        onFinishCallback()
      },
      [onFinishCallback]
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
                    .map((el: any) =>
                      el.heroes.reduce(
                        (acc: any, el: any) => (el ? [...acc, el.heroId] : acc),
                        []
                      )
                    )
                    .flat()
                  const heroOptions = heroes?.map(el => ({
                    ...el,
                    disabled: heroFields.includes(el.value),
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
                          {!i && <div>&mdash;</div>}
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
