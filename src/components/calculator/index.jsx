import React, {useCallback, useRef} from 'react'

import AdditionalOperations from "../additional-operations";
import useCalculator from './useCalculator';

import styles from './styles.module.css'

export default function Calculator() {
    // TODO обработать максимальное значение
    const { valueToDisplay, handleButtonClick } = useCalculator()
    const inputRef = useRef()

    const handleCalculatorClick = useCallback(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div className={styles.wrapper} onClick={handleCalculatorClick}>
            <input readOnly type="text" ref={inputRef} className={styles.input} value={valueToDisplay} />
            <AdditionalOperations handleButtonClick={handleButtonClick} />
        </div>
    )
}
