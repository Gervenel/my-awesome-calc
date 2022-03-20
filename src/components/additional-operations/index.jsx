import React, {useMemo} from 'react'
import Button from "../button";
import BasicOperations from "../basic-operations";
import {HistoryOutlined, BookOutlined} from '@ant-design/icons'
import {OPERATION} from "../constants";

import styles from './styles.module.css'

export default function AdditionalOperations(props) {
    const {handleButtonClick, handleOpenHistory, hasSavedValue, handleSaveValue, handleSetSavedValue} = props

    const BUTTONS = useMemo(() => [
        { className: styles.remove_one, backgroundColor: '#333', value: OPERATION.REMOVE_ONE},
        { className: styles.cos, backgroundColor: '#333', value: OPERATION.COS},
        { className: styles.sin, backgroundColor: '#333', value: OPERATION.SIN},
        { className: styles.tan, backgroundColor: '#333', value: OPERATION.TAN},
        { className: styles.cot, backgroundColor: '#333', value: OPERATION.COT},
        { className: styles.binary, backgroundColor: '#333', value: OPERATION.BINARY},
        { className: styles.fromBinary, backgroundColor: '#333', value: OPERATION.FROM_BINARY},
        { className: styles.degree, backgroundColor: '#333', value: OPERATION.DEGREE},
        { className: styles.degreeOfTwo, backgroundColor: '#333', value: OPERATION.DEGREE_OF_TWO},
        { className: styles.exhibitor, backgroundColor: '#333', value: OPERATION.EXPONENT},
        { className: styles.squareRoot, backgroundColor: '#333', value: OPERATION.SQUARE_ROOT},
        { className: styles.root, backgroundColor: '#333', value: OPERATION.ROOT},
        {
            className: styles.memory,
            backgroundColor: hasSavedValue ? '#f57c00' : '#cc9761',
            children: <BookOutlined />,
            handler: hasSavedValue ? handleSetSavedValue : handleSaveValue
        },
        { className: styles.history, backgroundColor: '#f57c00', children: <HistoryOutlined />, handler: handleOpenHistory },
        { className: styles.fact, backgroundColor: '#333', value: OPERATION.FACT},
    ], [handleOpenHistory, hasSavedValue, handleSaveValue, handleSetSavedValue])

    return (
        <div className={styles.wrapper}>
            {BUTTONS.map((meta, i) => (
                <Button
                    key={i}
                    className={meta.className}
                    backgroundColor={meta.backgroundColor}
                    handleClick={meta.handler ?? handleButtonClick}
                    value={meta.value}
                >
                    {meta.children}
                </Button>
            ))}
            <BasicOperations className={styles.basic} handleButtonClick={handleButtonClick} />
        </div>
    )
}
