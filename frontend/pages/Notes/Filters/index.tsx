import { INITIAL_VALUES } from '@/src/consts/Filters.consts'
import FiltersTeamFields from './FiltersTeamFields'
import {
  GameWithCharacterSetupSearchContract,
  HeroContract,
  TeamContract,
} from '@/src/api'
import { useCallback } from 'react'
import { Button, Form } from 'antd'
import Block from '@/src/components/Block'
import s from '@/styles/Filters.module.scss'

interface HeroesProps {
  id: number
}

interface FormValuesProps
  extends Omit<GameWithCharacterSetupSearchContract, 'setupCharacterIds'> {
  setupCharacterIds: HeroesProps[]
}

interface Props {
  isVisible: boolean
  onVisibleElement: () => void
  onSendGamesRequest: (values: GameWithCharacterSetupSearchContract) => void
  heroes?: HeroContract[]
  teams?: TeamContract[]
}

interface r {
  radiant: {
    teamId: number
    setupCharacterIds: number[]
  }
  dire: {
    teamId: number
    setupCharacterIds: number[]
  }
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
          (acc, el) => (el?.id ? [...acc, el.id] : acc),
          []
        ),
      })
    },
    [onSendGamesRequest]
  )

  return (
    <Form<FormValuesProps>
      initialValues={INITIAL_VALUES}
      onFinish={handleFinish}
    >
      <Block className={s.wrapper}>
        <FiltersTeamFields
          mainFieldName="radiant"
          dependFieldName="dire"
          heroes={heroes}
          teams={teams}
        />
        <FiltersTeamFields
          mainFieldName="dire"
          dependFieldName="radiant"
          heroes={heroes}
          teams={teams}
        />
        <div>
          <Button onClick={onVisibleElement} disabled={isVisible} block>
            New note
          </Button>
          <Button type="primary" htmlType="submit" block className={s.button}>
            Search
          </Button>
        </div>
      </Block>
    </Form>
  )
}
