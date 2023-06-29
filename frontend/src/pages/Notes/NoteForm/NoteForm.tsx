import { Button, Form, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/lib/form/Form'
import { FC, Fragment, memo, useCallback } from 'react'
import { HEROES_MOCK } from '../../../mock'
import { Block } from 'shared/components'
import { HeroSelect } from './HeroSelect'
import s from './NoteForm.module.scss'

export const NoteForm: FC = memo((props) => {
  const [form] = useForm()

  const handleFinish = useCallback((values: any) => {
    console.log(values)
  }, [])

  return (
    <Form form={form} onFinish={handleFinish}
          initialValues={{ teams: [{ heroes: new Array(5).fill(undefined) }, { heroes: new Array(5).fill(undefined) }] }}>
      <Block className={s.wrapper}>
        <Form.List name="teams">
          {(fields) => (
            <Space>
              {fields.map((field, i) => (
                <Fragment key={field.key}>
                  <div>
                    <Form.Item name={[field.name, 'name']} className={s.title}>
                      <Input placeholder={`Team ${i + 1}`}/>
                    </Form.Item>
                    <Form.List name={[field.name, 'heroes']}>
                      {(fields) => (
                        <Space>
                          {fields.map(hero => (
                            <HeroSelect
                              key={hero.key}
                              heroes={HEROES_MOCK}
                              teamFieldName={field.name}
                              fieldName={hero.name}
                              form={form}
                            />
                          ))}
                        </Space>)}
                    </Form.List>
                  </div>
                  {!i && <div>&mdash;</div>}
                </Fragment>
              ))}
            </Space>)}
        </Form.List>
        <div>
          <Form.Item noStyle name="comment">
            <TextArea rows={4} placeholder="Comment"/>
          </Form.Item>
          <Button block className={s.button} htmlType="submit">Сохранить</Button>
        </div>
      </Block>
    </Form>
  )
})
