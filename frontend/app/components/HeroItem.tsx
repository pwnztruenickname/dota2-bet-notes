import Image from 'next/image'
import { CharacterInTeamContract } from '@/src/api'
import { HEROES_IMG_URL, ROLES_LIST } from '@/src/consts'
import s from '@/styles/HeroItem.module.scss'
import { Text } from '@chakra-ui/react'

interface Props {
  hero: CharacterInTeamContract
}

export default function HeroItem({ hero }: Props) {
  const Icon = ROLES_LIST[hero.gameRole!]
  return (
    <div className={s.wrapper}>
      <Icon className={s.role} />
      <Image src={`${HEROES_IMG_URL}${hero.hero?.name}.png`} alt='' className={s.icon} width={100} height={60} />
      <Text title={hero.hero?.localizedName || ''} className={s.name}>
        {hero.hero?.localizedName}
      </Text>
    </div>
  )
}
