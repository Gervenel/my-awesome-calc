import {useCallback, useRef, useState} from "react";
import {message} from "antd";

export default function useSavedValue(getCurrentOperandValue, setCurrentOperandValue) {
    const [savedValue, setSavedValue] = useState('')

    const savedValueRef = useRef(savedValue)

    savedValueRef.current = savedValue

    const handleSaveValue = useCallback(() => {
        let currentValue = getCurrentOperandValue()
        currentValue = parseFloat(currentValue)

        if (isNaN(currentValue) || currentValue === Infinity || currentValue === -Infinity) {
            message.error('Нельзя сохранить невалидное значение')
        } else {
            message.info('Число сохранено в памяти')
            setSavedValue(currentValue)
        }
    }, [getCurrentOperandValue])

    const handleSetSavedValue = useCallback(() => {
        setCurrentOperandValue(savedValueRef.current)
        message.info('Чисто из памяти установленно текущем значением')
        setSavedValue('')
    }, [])

    return { hasSavedValue: Boolean(savedValue), handleSaveValue, handleSetSavedValue }
}
