import { Button, Form, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useForm } from 'antd/lib/form/Form'
import { FC, memo, useCallback } from 'react'
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
    <Form form={form} onFinish={handleFinish} initialValues={{ teams: [{ heroes: new Array(5).fill(undefined) }, { heroes: new Array(5).fill(undefined) }] }}>
      <Block className={s.wrapper}>
        <Form.List name="teams">
          {(fields) => (
            <Space>
              {fields.map((field, i) => (
                <>
                  <div key={field.key}>
                    <Form.Item name={[field.name, 'name']} className={s.title}>
                      <Input />
                    </Form.Item>
                    <Form.List name={[field.name, 'heroes']}>
                      {(fields) => (
                        <Space>
                          {fields.map(hero => (
                            <HeroSelect
                              key={hero.key}
                              heroes={HEROES_MOCK}
                              name={hero.name}
                              form={form}
                            />
                          ))}
                        </Space>)}
                    </Form.List>
                  </div>
                  {!i && <div>&mdash;</div>}
                </>
              ))}
            </Space>)}
        </Form.List>
        <div>
          <Form.Item noStyle name="comment">
            <TextArea rows={4}/>
          </Form.Item>
          <Button block className={s.button} htmlType="submit">Сохранить</Button>
        </div>
      </Block>
    </Form>
  )
})
