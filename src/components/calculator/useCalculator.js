import {useCallback, useEffect, useState} from "react";
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
import useCalculatorStateRefs from "./hooks/useCalculatorStateRefs";
import useCalcHistory from "./hooks/useCalcHistory";

/*
* Бинарные операции и унарные надо разделять таким макаром, что унарные применяются на текущее число, бинарные на оба
* */
/* TODO add
    1) Остальные операции
        remove one
    2) Смайлик для операций
    3) Историю операций
    4) Сохранение одного числа в памяти и доставание из памяти
    5) Проверить все
* */
export default function useCalculator() {
    const [firstOperand, setFirstOperand] = useState(DEFAULT_CALCULATOR_VALUE)
    const [secondOperand, setSecondOperand] = useState('')
    const [valueToDisplay, setValueToDisplay] = useState(DEFAULT_CALCULATOR_VALUE)
    const [operation, setOperation] = useState('')

    const [firstOperandRef, secondOperandRef, operationRef] = useCalculatorStateRefs(firstOperand, secondOperand, operation)
    const [history, updateHistory] = useCalcHistory()

    // TODO remove after complete
    useEffect(() => {
        // console.table({firstOperand, secondOperand, operation, valueToDisplay})
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
        const operation = operationRef.current
        const stateUpdater = stateToViewUpdater(value)

        if (operation && OPERATIONS_WITH_TWO_OPERANDS.includes(operation)) {
            setSecondOperand(stateUpdater)
        } else {
            setFirstOperand(stateUpdater)
        }
    }, [stateToViewUpdater])

    const calculate = useCallback((operation) => {
        const firstOperand = parseFloat(firstOperandRef.current)
        const secondOperand = parseFloat(secondOperandRef.current)
        const operationHandler = operationHandlerMap.get(operation)

        let calculatedValue;

        if (OPERATIONS_WITH_ONE_OPERAND.includes(operation)) {
            calculatedValue = operationHandler(firstOperand)
        } else if (OPERATIONS_WITH_TWO_OPERANDS.includes(operation) && secondOperand) {
            calculatedValue = operationHandler(firstOperand, secondOperand)
        }

        if (calculatedValue) {
            const valueToState = calculatedValue.toString()
            updateHistory(firstOperand, secondOperand, operation)

            setFirstOperand(() => valueToState)
            setValueToDisplay(() => valueToState)
            setSecondOperand(() => '')
            setOperation(() => '')
        }
    }, [])

    const handleEnterOperator = useCallback((operation) => {
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

        calculate(operationRef.current ?? operation)
    }, [calculate])

    const handleButtonClick = useCallback((value) => {
        if (OPERANDS.includes(value)) {
            handleEnterOperand(value)
        } else if (OPERATIONS.includes(value)) {
            handleEnterOperator(value)
        }
    }, [handleEnterOperand, handleEnterOperator])

    return { valueToDisplay, handleButtonClick, history }
}
