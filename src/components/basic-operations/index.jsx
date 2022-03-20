import React from 'react'
import InputButtons from "../input-buttons";
import Button from "../button";
import {OPERATION} from "../constants";

import styles from './styles.module.css'

const BUTTONS = [
    { className: styles.clear, backgroundColor: '#333', value: OPERATION.CLEAR},
    { className: styles.sign, backgroundColor: '#333', value: OPERATION.CHANGE_SIGN},
    { className: styles.percent, backgroundColor: '#333', value: OPERATION.PERCENT},
    { className: styles.division, backgroundColor: '#f57c00', value: OPERATION.DIVISION},
    { className: styles.multiply, backgroundColor: '#f57c00', value: OPERATION.MULTIPLY},
    { className: styles.adding, backgroundColor: '#f57c00', value: OPERATION.ADDING},
    { className: styles.subtract, backgroundColor: '#f57c00', value: OPERATION.SUBTRACTION},
    { className: styles.calculate, backgroundColor: '#f57c00', value: OPERATION.CALCULATE},
]

export default function BasicOperations({handleButtonClick, className}) {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {BUTTONS.map(meta => (
                <Button
                    key={meta.value}
                    className={meta.className}
                    backgroundColor={meta.backgroundColor}
                    handleClick={handleButtonClick}
                    value={meta.value}
                />
            ))}
            <InputButtons className={styles.numbers} handleButtonClick={handleButtonClick} />
        </div>
    )
}
