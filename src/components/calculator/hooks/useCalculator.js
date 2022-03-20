import {useCallback, useEffect, useState} from "react";
import {
    OPERAND,
    OPERANDS,
    OPERATIONS,
    OPERATIONS_WITH_ONE_OPERAND,
    DEFAULT_CALCULATOR_VALUE, OPERATION,
} from "../../constants";

import useSavedValue from './useSavedValue'
import useCalcHistory from './useCalcHistory'
import useCalculatorStateRefs from './useCalculatorStateRefs'
import useCalculatorDisplayValueEffects from './useCalculatorDisplayValueEffects'
import useOperationHandlers from './useOperationHandlers'

export default function useCalculator() {
    const [firstOperand, setFirstOperand] = useState(DEFAULT_CALCULATOR_VALUE)
    const [secondOperand, setSecondOperand] = useState('')
    const [valueToDisplay, setValueToDisplay] = useState(firstOperand)
    const [unaryOperation, setUnaryOperation] = useState('')
    const [binaryOperation, setBinaryOperation] = useState('')
    const [isFinish, setIsFinish] = useState(false)

    const { firstOperandRef, secondOperandRef, binaryOperationRef, isFinishRef } = useCalculatorStateRefs(firstOperand, secondOperand, binaryOperation, isFinish)
    const { history, updateHistory } = useCalcHistory()
    const { operationHandlerMap, error, handleResetError } = useOperationHandlers()

    useCalculatorDisplayValueEffects(firstOperand, secondOperand, setValueToDisplay)

    const getCurrentValues = useCallback(() => {
        return {
            firstOperand: firstOperandRef.current,
            secondOperand: secondOperandRef.current,
            binaryOperation: binaryOperationRef.current,
            isFinish: isFinishRef.current,
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
            setIsFinish(false)
            setBinaryOperation(() => operation)
        }
    }, [])

    const handleButtonClick = useCallback((value) => {
        handleResetError()

        let { firstOperand, isFinish } = getCurrentValues()

        firstOperand = parseFloat(firstOperand)

        if (isNaN(firstOperand) || firstOperand === Infinity || firstOperand === -Infinity) {
            setFirstOperand(() => DEFAULT_CALCULATOR_VALUE)
            setSecondOperand(() => '')
            setBinaryOperation(() => '')
        }

        if (OPERANDS.includes(value)) {
            if (isFinish) {
                setFirstOperand(() => DEFAULT_CALCULATOR_VALUE)
                setIsFinish(() => false)
            }

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
                if (unaryOperation === OPERATION.EXPONENT) {
                    setIsFinish(true)
                }

                const operationHandler = operationHandlerMap.get(unaryOperation)

                calculatedValue = operationHandler(parseFloat(currentValue)).toString()
            }

            setCurrentOperandValue(calculatedValue)
            updateHistory(` ${unaryOperation} ${currentValue} = ${calculatedValue}`)
            setUnaryOperation(() => '')
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
                    updateHistory(` ${firstOperand} ${binaryOperation} ${secondOperand} = ${calculatedValue}`)
                    setSecondOperand(() => '')
                    setBinaryOperation(() => '')
                    setIsFinish(() => true)
                }
            }
        }
    }, [binaryOperation])

    // it placed here just to see all function above
    const { hasSavedValue, handleSaveValue, handleSetSavedValue } = useSavedValue(getCurrentOperandValue, setCurrentOperandValue)

    return {
        valueToDisplay,
        handleButtonClick,
        setCurrentOperandValue,
        history,
        hasSavedValue,
        handleSaveValue,
        handleSetSavedValue,
        error
    }
}

