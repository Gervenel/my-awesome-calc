import {useCallback, useRef, useState} from "react";

export default function useSavedValue(getCurrentOperandValue, setCurrentOperandValue) {
    const [savedValue, setSavedValue] = useState('')

    const savedValueRef = useRef(savedValue)

    savedValueRef.current = savedValue

    const handleSaveValue = useCallback(() => {
        const currentValue = getCurrentOperandValue()

        setSavedValue(currentValue)
    }, [getCurrentOperandValue])

    const handleSetSavedValue = useCallback(() => {
        setCurrentOperandValue(savedValueRef.current)
        setSavedValue('')
    }, [])

    return { hasSavedValue: Boolean(savedValue), handleSaveValue, handleSetSavedValue }
}
