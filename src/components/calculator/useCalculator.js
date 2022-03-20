import {useCallback, useEffect, useState} from "react";
import {
    OPERAND,
    OPERANDS,
    OPERATIONS,
    OPERATIONS_WITH_ONE_OPERAND,
    DEFAULT_CALCULATOR_VALUE, OPERATION,
} from "../constants";
import {operationHandlerMap} from "./operation-handlers";

import {
    useCalcHistory,
    useCalculatorStateRefs,
    useCalculatorDisplayValueEffects,
} from "./hooks";

/* TODO add
        Если после операции, пользователь вводит число, сносить старое
    2) Смайлик для операций
    3) Историю операций
    4) Сохранение одного числа в памяти и доставание из памяти
    5) Проверить все
* */
export default function useCalculator() {
    const [firstOperand, setFirstOperand] = useState(DEFAULT_CALCULATOR_VALUE)
    const [secondOperand, setSecondOperand] = useState('')
    const [valueToDisplay, setValueToDisplay] = useState(firstOperand)
    const [unaryOperation, setUnaryOperation] = useState('')
    const [binaryOperation, setBinaryOperation] = useState('')
    const [isFinish, setIsFinish] = useState(false)

    const [firstOperandRef, secondOperandRef, binaryOperationRef] = useCalculatorStateRefs(firstOperand, secondOperand, binaryOperation)
    const [history, updateHistory] = useCalcHistory()

    useCalculatorDisplayValueEffects(firstOperand, secondOperand, setValueToDisplay)

    // useEffect(() => {
    //     console.table({firstOperand, secondOperand, valueToDisplay, binaryOperation, unaryOperation})
    // }, [firstOperand, secondOperand, valueToDisplay, binaryOperation, unaryOperation])

    const getCurrentValues = useCallback(() => {
        return {
            firstOperand: firstOperandRef.current,
            secondOperand: secondOperandRef.current,
            binaryOperation: binaryOperationRef.current
        }
    }, [])

    const getCurrentOperandValue = useCallback(() => {
        const { firstOperand, secondOperand, binaryOperation } = getCurrentValues()

        if (firstOperand && binaryOperation) {
            return secondOperand
        } else {
            return firstOperand
        }
    }, [])

    const setCurrentOperandValue = useCallback((value) => {
        const { firstOperand, binaryOperation } = getCurrentValues()

        if (value === '') {
            value = DEFAULT_CALCULATOR_VALUE
        }

        if (firstOperand && binaryOperation) {
            return setSecondOperand(() => value)
        } else {
            return setFirstOperand(() => value)
        }
    }, [])

    const getValueValidator = useCallback(value => prev => {
        if (prev === DEFAULT_CALCULATOR_VALUE && value !== OPERAND.DOT) {
            return value
        }

        if (prev.includes(OPERAND.DOT) && value === OPERAND.DOT) {
            return prev
        }

        return prev + value
    }, [])

    const handleEnterOperand = useCallback((value) => {
        const { firstOperand, binaryOperation } = getCurrentValues()
        const valueValidator = getValueValidator(value)

        if (firstOperand && binaryOperation) {
            setSecondOperand(valueValidator)
        } else {
            setFirstOperand(valueValidator)
        }
    }, [])

    const handleEnterOperator = useCallback((operation) => {
        if (OPERATIONS_WITH_ONE_OPERAND.includes(operation)) {
            setUnaryOperation(() => operation)
        } else {
            setBinaryOperation(() => operation)
        }
    }, [])

    const handleButtonClick = useCallback((value) => {
        if (OPERANDS.includes(value)) {
            handleEnterOperand(value)
        } else if (OPERATIONS.includes(value)) {
            handleEnterOperator(value)
        }
    }, [handleEnterOperand, handleEnterOperator])

    // For unary operations
    useEffect(() => {
        if (unaryOperation) {
            const currentValue = getCurrentOperandValue()
            let calculatedValue

            if (unaryOperation === OPERATION.REMOVE_ONE) {
                calculatedValue = currentValue.slice(0, currentValue.length - 1)
            } else {
                const operationHandler = operationHandlerMap.get(unaryOperation)

                calculatedValue = operationHandler(parseFloat(currentValue)).toString()
            }

            setCurrentOperandValue(calculatedValue)
            console.log('un')
            updateHistory(` ${unaryOperation} ${currentValue} = ${calculatedValue}`)
            setUnaryOperation('')
        }
    }, [unaryOperation])

    // For binary operations
    useEffect(() => {
        if (binaryOperation === OPERATION.CALCULATE) {
            setBinaryOperation(() => '')
        } else if (binaryOperation === OPERATION.CLEAR) {
            setFirstOperand(() => DEFAULT_CALCULATOR_VALUE)
            setSecondOperand(() => '')
            setBinaryOperation(() => '')
        }

        return () => {
            if (binaryOperation) {
                const { firstOperand, secondOperand } = getCurrentValues()

                if (firstOperand && secondOperand) {
                    const operationHandler = operationHandlerMap.get(binaryOperation)
                    const calculatedValue = operationHandler(parseFloat(firstOperand), parseFloat(secondOperand)).toString()

                    setFirstOperand(() => calculatedValue)
                    console.log('bin')
                    updateHistory(` ${firstOperand} ${binaryOperation} ${secondOperand} = ${calculatedValue}`)
                    setSecondOperand(() => '')
                    setBinaryOperation(() => '')
                }
            }
        }
    }, [binaryOperation])

    return { valueToDisplay, handleButtonClick, history }
}
