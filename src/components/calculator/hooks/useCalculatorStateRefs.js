import {useRef} from "react";

export default function useCalculatorStateRefs(firstOperand, secondOperand, binaryOperation) {
    const firstOperandRef = useRef(firstOperand)
    const secondOperandRef = useRef(secondOperand)
    const binaryOperationRef = useRef(binaryOperation)

    firstOperandRef.current = firstOperand
    secondOperandRef.current = secondOperand
    binaryOperationRef.current = binaryOperation

    return [
        firstOperandRef,
        secondOperandRef,
        binaryOperationRef,
    ]
}
