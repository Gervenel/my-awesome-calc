import {useCallback, useState} from "react";

export default function useCalcHistory() {
    const [history, setHistory] = useState([])

    const updateHistory = useCallback((fOperand, sOperand, operation) => {
        setHistory((p) => [...p, `${fOperand} ${operation} ${sOperand}`])
    }, [])

    return [history, updateHistory]
}
