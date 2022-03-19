import {useRef} from "react";

export default function useCalculatorStateRefs(firstOperand, secondOperand, valueToDisplay, currentOperandSetter, operation) {
    const firstOperandRef = useRef(firstOperand)
    const secondOperandRef = useRef(secondOperand)
    const valueToDisplayRef = useRef(valueToDisplay)
    const currentOperandSetterRef = useRef(currentOperandSetter)
    const operationRef = useRef(operation)

    firstOperandRef.current = firstOperand
    secondOperandRef.current = secondOperand
    valueToDisplayRef.current = valueToDisplay
    currentOperandSetterRef.current = currentOperandSetterRef
    operationRef.current = operation

    return [
        firstOperandRef,
        secondOperandRef,
        valueToDisplayRef,
        currentOperandSetterRef,
        operationRef
    ]
}
