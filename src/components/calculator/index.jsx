import React, {useCallback, useRef, useState} from 'react'
import {message} from "antd";

import AdditionalOperations from "../additional-operations";
import useCalculator from './useCalculator';
import HistoryModal from "../history-modal";

import styles from './styles.module.css'

export default function Calculator() {
    // TODO обработать максимальное значение
    const [historyModalOpen, setHistoryModalOpen] = useState(false)
    const { valueToDisplay, handleButtonClick, history, hasSavedValue, handleSaveValue, handleSetSavedValue, } = useCalculator()
    const inputRef = useRef()

    const handleCalculatorClick = useCallback(() => {
        inputRef.current.focus()
    }, [])

    const handleOpenHistory = useCallback(() => {
        setHistoryModalOpen(true)
    }, [])

    const handleHideHistory = useCallback(() => {
        setHistoryModalOpen(false)
    }, [])

    const saveValue = useCallback(() => {
        handleSaveValue()
        message.info('Число сохранено в памяти')
    }, [])

    const setSavedValue = useCallback(() => {
        handleSetSavedValue()
        message.info('Чисто из памяти установленно текущем значением')
    }, [])

    return (
        <>
            <div className={styles.wrapper} onClick={handleCalculatorClick}>
                <input readOnly type="text" ref={inputRef} className={styles.input} value={valueToDisplay} />
                <AdditionalOperations
                    handleButtonClick={handleButtonClick}
                    handleOpenHistory={handleOpenHistory}
                    hasSavedValue={hasSavedValue}
                    handleSaveValue={saveValue}
                    handleSetSavedValue={setSavedValue}
                />
            </div>
            <HistoryModal visible={historyModalOpen} history={history} hide={handleHideHistory} />
        </>
    )
}
