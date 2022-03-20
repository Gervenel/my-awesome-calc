import {useRef} from "react";

export default function useCalculatorStateRefs(firstOperand, secondOperand, binaryOperation, isFinish) {
    const firstOperandRef = useRef(firstOperand)
    const secondOperandRef = useRef(secondOperand)
    const binaryOperationRef = useRef(binaryOperation)
    const isFinishRef = useRef(isFinish)

    firstOperandRef.current = firstOperand
    secondOperandRef.current = secondOperand
    binaryOperationRef.current = binaryOperation
    isFinishRef.current = isFinish

    return {
        firstOperandRef,
        secondOperandRef,
        binaryOperationRef,
        isFinishRef,
    }
}
