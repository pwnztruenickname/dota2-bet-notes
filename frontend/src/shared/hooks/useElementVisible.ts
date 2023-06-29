import { useCallback, useState } from 'react'

export interface UseElementVisibleResultProps {
    elementVisible: boolean;
    toggleElementVisible: () => void;
    handleHideElement: () => void;
    handleShowElement: () => void;
    updateElementVisible: (value: boolean) => void;
}

export function useElementVisible(
    initialValue = false,
): UseElementVisibleResultProps {
    const [elementVisible, setElementVisible] = useState(initialValue)

    const toggleElementVisible = useCallback(() => {
        setElementVisible((elementVisible) => !elementVisible)
    }, [])

    const handleHideElement = useCallback(() => {
        setElementVisible(false)
    }, [])

    const handleShowElement = useCallback(() => {
        setElementVisible(true)
    }, [])

    const updateElementVisible = useCallback((visible: boolean) => {
        setElementVisible(visible)
    }, [])

    return {
        elementVisible,
        toggleElementVisible,
        handleHideElement,
        handleShowElement,
        updateElementVisible,
    }
}
