import React, {useCallback, useRef, useState} from 'react'

import AdditionalOperations from "../additional-operations";
import useCalculator from './hooks/useCalculator';
import HistoryModal from "../history-modal";

import styles from './styles.module.css'
import Emoji from "../emoji";

export default function Calculator() {
    // TODO обработать максимальное значение
    const [historyModalOpen, setHistoryModalOpen] = useState(false)
    const {
        valueToDisplay,
        handleButtonClick,
        history,
        hasSavedValue,
        handleSaveValue,
        handleSetSavedValue,
        error,
    } = useCalculator()
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

    return (
        <div>
            <Emoji error={error} />
            <div className={styles.wrapper} onClick={handleCalculatorClick}>
                <input readOnly type="text" ref={inputRef} className={styles.input} value={valueToDisplay} />
                <AdditionalOperations
                    handleButtonClick={handleButtonClick}
                    handleOpenHistory={handleOpenHistory}
                    hasSavedValue={hasSavedValue}
                    handleSaveValue={handleSaveValue}
                    handleSetSavedValue={handleSetSavedValue}
                />
            </div>
            <HistoryModal visible={historyModalOpen} history={history} hide={handleHideHistory} />
        </div>
    )
}
