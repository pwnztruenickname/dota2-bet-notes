import { FC } from 'react'
import { GAMES_MOCK } from '../../mock'
import { useElementVisible } from 'shared/hooks'
import { Filters } from './Filters'
import { Note } from './Note'
import { NoteForm } from './NoteForm'

export const Notes: FC = () => {
    const { elementVisible, handleHideElement, handleShowElement } = useElementVisible()

    return (
        <>
            <Filters isVisible={elementVisible} onVisibleElement={handleShowElement}/>
            {elementVisible && <NoteForm onFinishCallback={handleHideElement} />}
            {GAMES_MOCK.map(el => (
                <Note game={el} key={el.id} />
            ))}
        </>
    )
}
