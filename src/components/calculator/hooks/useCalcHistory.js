import {useCallback, useEffect, useState} from "react";

const LC_NAME = 'my-awesome-calc'

export default function useCalcHistory() {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const prevHistory = localStorage.getItem(LC_NAME)

        if (prevHistory) {
            setHistory(JSON.parse(prevHistory))
        }
    }, [])

    const updateHistory = useCallback((historyItem) => {
        setHistory((p) => {
            const newValue = [historyItem, ...p]

            localStorage.setItem(LC_NAME, JSON.stringify(newValue))

            return newValue
        })
    }, [])

    return { history, updateHistory }
}
