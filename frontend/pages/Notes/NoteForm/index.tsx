import TeamFields from './TeamFields'
import CupIcon from '@/public/cup.svg'
import { INITIAL_VALUES } from './consts'
import { useCallback } from 'react'
import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { api, GameCreateContract, HeroContract, TeamContract } from '@/src/api'
import Block from '@/src/components/Block'
import { useRequest } from '@/src/hooks'
import s from '@/styles/NoteForm.module.scss'

interface Props {
  onFinishCallback: () => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

export default function NoteForm({ onFinishCallback, heroes, teams }: Props) {
  const [form] = useForm()
  const { sendRequest } = useRequest(api.gameCreate)

  const handleFinish = useCallback(
    async (values: GameCreateContract) => {
      sendRequest(values).then(() => {
        onFinishCallback()
      })
    },
    [onFinishCallback, sendRequest]
  )

  return (
    <Form<GameCreateContract>
      form={form}
      onFinish={handleFinish}
      initialValues={INITIAL_VALUES}
    >
      <Block className={s.wrapper}>
        <TeamFields
          mainFieldName="radiant"
          dependFieldName="dire"
          heroes={heroes}
          teams={teams}
        />
        <CupIcon className={s.cup} />
        <TeamFields
          mainFieldName="dire"
          dependFieldName="radiant"
          heroes={heroes}
          teams={teams}
        />
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
