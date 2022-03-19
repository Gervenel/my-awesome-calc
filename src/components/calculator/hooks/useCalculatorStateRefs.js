import {useRef} from "react";

export default function useCalculatorStateRefs(firstOperand, secondOperand, operation) {
    const firstOperandRef = useRef(firstOperand)
    const secondOperandRef = useRef(secondOperand)
    const operationRef = useRef(operation)

    firstOperandRef.current = firstOperand
    secondOperandRef.current = secondOperand
    operationRef.current = operation

    return [
        firstOperandRef,
        secondOperandRef,
        operationRef,
    ]
}
