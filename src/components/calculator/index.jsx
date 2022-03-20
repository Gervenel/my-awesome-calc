import React, {useCallback, useRef, useState} from 'react'

import AdditionalOperations from "../additional-operations";
import useCalculator from './useCalculator';
import HistoryModal from "../history-modal";

import styles from './styles.module.css'

export default function Calculator() {
    // TODO обработать максимальное значение
    const [historyModalOpen, setHistoryModalOpen] = useState(false)
    const { valueToDisplay, handleButtonClick, history } = useCalculator()
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
        <>
            <div className={styles.wrapper} onClick={handleCalculatorClick}>
                <input readOnly type="text" ref={inputRef} className={styles.input} value={valueToDisplay} />
                <AdditionalOperations handleButtonClick={handleButtonClick} handleOpenHistory={handleOpenHistory} />
            </div>
            <HistoryModal visible={historyModalOpen} history={history} hide={handleHideHistory}/>
        </>
    )
}
