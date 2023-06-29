import { Button } from 'antd'
import { FC, memo } from 'react'
import { Block } from 'shared/components'
import { FiltersProps } from './Filters.model'
import s from './Filters.module.scss'

export const Filters: FC<FiltersProps> = memo(({onVisibleElement, isVisible}) => {
    return (
        <Block className={s.wrapper}>
            <Button onClick={onVisibleElement} disabled={isVisible}>Новый матч</Button>
            <h2>Тут будут фильтры</h2>
        </Block>
    )
})
