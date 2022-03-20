import {useCallback, useState} from "react";

export default function useCalcHistory() {
    const [history, setHistory] = useState([])

    const updateHistory = useCallback((historyItem) => {
        setHistory((p) => [...p, historyItem])
    }, [])

    return [history, updateHistory]
}
