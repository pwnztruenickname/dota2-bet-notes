import { TeamInGameContract } from '@/src/api'
import { Typography, Space } from 'antd'
import HeroItem from './HeroItem'
import s from '@/styles/Team.module.scss'

interface Props {
  team?: TeamInGameContract
}

export default function Team({ team }: Props) {
  return (
    <div>
      {team && (
        <>
          <Typography.Title level={3} className={s.title}>
            {team.team?.name}
          </Typography.Title>
          <Space>
            {team.charactersInTeam?.map(hero => (
              <HeroItem hero={hero} key={hero.id} />
            ))}
          </Space>
        </>
      )}
    </div>
  )
}
