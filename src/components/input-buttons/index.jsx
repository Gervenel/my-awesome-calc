import React from 'react'
import Button from "../button";

import styles from './styles.module.css'
import {OPERAND} from "../constants";

const BUTTONS = [
    { className: styles.zero, value: OPERAND.ZERO },
    { className: styles.one, value: OPERAND.ONE },
    { className: styles.two, value: OPERAND.TWO },
    { className: styles.three, value: OPERAND.THREE },
    { className: styles.four, value: OPERAND.FOUR },
    { className: styles.five, value: OPERAND.FIVE },
    { className: styles.six, value: OPERAND.SIX },
    { className: styles.seven, value: OPERAND.SEVEN },
    { className: styles.eight, value: OPERAND.EIGHT },
    { className: styles.nine, value: OPERAND.NINE },
    { className: styles.dot, value: OPERAND.DOT },
]

export default function InputButtons({className, handleButtonClick}) {
    return (
        <div className={`${styles.wrapper} ${className}`} >
            {BUTTONS.map((meta) => (
                <Button key={meta.value} className={meta.className} handleClick={handleButtonClick}>{meta.value}</Button>
            ))}
        </div>
    )
}
