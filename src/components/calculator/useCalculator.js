import {useCallback, useEffect, useRef, useState} from "react";
import {
    OPERAND,
    OPERANDS,
    OPERATION,
    OPERATIONS,
    OPERATIONS_WITH_ONE_OPERAND,
    OPERATIONS_WITH_TWO_OPERANDS,
    DEFAULT_CALCULATOR_VALUE,
} from "../constants";
import {operationHandlerMap} from "./operation-handlers";

// TODO поправить выполнение одиночных операций для текушего вводимого числа
export default function useCalculator() {
    const [firstOperand, setFirstOperand] = useState(DEFAULT_CALCULATOR_VALUE)
    const [secondOperand, setSecondOperand] = useState('')
    const [operation, setOperation] = useState('')
    const [valueToDisplay, setValueToDisplay] = useState(DEFAULT_CALCULATOR_VALUE)

    const firstOperandRef = useRef(DEFAULT_CALCULATOR_VALUE)
    const secondOperandRef = useRef('')
    const operationRef = useRef('')
    firstOperandRef.current = firstOperand
    secondOperandRef.current = secondOperand
    operationRef.current = operation

    // TODO remove after complete
    useEffect(() => {
        console.table({firstOperand, secondOperand, operation, valueToDisplay})
    }, [firstOperand, secondOperand, operation, valueToDisplay])

    const validateValue = useCallback((prev, value) => {
        if (prev === DEFAULT_CALCULATOR_VALUE && value !== OPERAND.DOT) {
            return value
        }

        if (prev.includes(OPERAND.DOT) && value === OPERAND.DOT) {
            return prev
        }

        return prev + value
    }, [])

    const stateToViewUpdater = useCallback(value => prevState => {
        const validatedValue = validateValue(prevState, value)

        setValueToDisplay(() => validatedValue)

        return validatedValue
    }, [validateValue])

    const handleEnterOperand = useCallback((value) => {
        const stateUpdater = stateToViewUpdater(value)

        if (operationRef.current) {
            setSecondOperand(stateUpdater)
        } else {
            setFirstOperand(stateUpdater)
        }
    }, [stateToViewUpdater])

    const calculate = useCallback((operationToExecute) => {
        const firstOperand = parseFloat(firstOperandRef.current)
        const secondOperand = parseFloat(secondOperandRef.current)
        const operation = operationToExecute ?? operationRef.current
        const operationHandler = operationHandlerMap.get(operation)

        let calculatedValue;

        if (OPERATIONS_WITH_ONE_OPERAND.includes(operation)) {
            calculatedValue = operationHandler(firstOperand)
        } else if (OPERATIONS_WITH_TWO_OPERANDS.includes(operation) && secondOperand) {
            calculatedValue = operationHandler(firstOperand, secondOperand)
        }

        if (calculatedValue) {
            const valueToState = calculatedValue.toString()

            setFirstOperand(() => valueToState)
            setValueToDisplay(() => valueToState)
            setSecondOperand(() => '')
            setOperation(() => '')
        }
    }, [])

    const handleEnterOperator = useCallback((operation) => {
        setValueToDisplay(() => DEFAULT_CALCULATOR_VALUE)

        if (operation === OPERATION.CLEAR) {
            setValueToDisplay(() => DEFAULT_CALCULATOR_VALUE)
            setFirstOperand(() => DEFAULT_CALCULATOR_VALUE)
            setSecondOperand(() => '')
            setOperation(() => '')

            return
        }

        if (operation !== OPERATION.CALCULATE) {
            setOperation(() => operation)
        }

        calculate(operationRef.current || operation)
    }, [calculate])

    const handleButtonClick = useCallback((value) => {
        if (OPERANDS.includes(value)) {
            handleEnterOperand(value)
        } else if (OPERATIONS.includes(value)) {
            handleEnterOperator(value)
        }
    }, [handleEnterOperand, handleEnterOperator])

    return { valueToDisplay, handleButtonClick }
}
