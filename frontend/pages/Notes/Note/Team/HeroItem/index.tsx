import { CharacterInTeamContract } from '@/src/api'
import { HEROES_IMG_URL, ROLES_LIST } from '@/src/consts'
import s from '@/styles/HeroItem.module.scss'
import { theme, Typography } from 'antd'

interface Props {
  hero?: CharacterInTeamContract
}

export default function HeroItem({ hero }: Props) {
  const { token } = theme.useToken()
  const Icon = hero?.gameRole ? ROLES_LIST[hero.gameRole] : undefined

  return (
    <div className={s.wrapper}>
      {Icon && (
        <Icon
          className={s.role}
          style={{
            borderColor: token.colorError,
            backgroundColor: token.colorBgLayout,
          }}
        />
      )}
      <div
        className={s.icon}
        style={{
          backgroundImage: `url(${HEROES_IMG_URL}${hero?.hero?.name}.png)`,
          borderColor: token.colorBgLayout,
        }}
      />

      <Typography.Paragraph
        className={s.name}
        title={hero?.hero?.localizedName || ''}
      >
        {hero?.hero?.localizedName}
      </Typography.Paragraph>
    </div>
  )
}
