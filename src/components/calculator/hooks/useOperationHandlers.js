import {useCallback, useMemo, useState} from "react";

import {OPERATION} from "../../constants";

export default function UseOperationHandlers() {
    const [error, setError] = useState(false)

    const handleResetError = useCallback(() => {
        setError(false)
    }, [])

    const handleChangeSigh = useCallback((v) => {
        if (v === 0) {
            return v
        }

        return v * -1
    }, [])

    const handlePercent = useCallback((v) => {
        return v / 100
    }, [])

    const handleDivision = useCallback((f, s) => {
        if (s === 0) {
            setError(true)
        }

        return f / s
    }, [])

    const handleMultiply = useCallback((f, s) => {
        return f * s
    }, [])

    const handleAdding = useCallback((f, s) => {
        return f + s
    }, [])

    const handleSubtract = useCallback((f, s) => {
        return f - s
    }, [])

    const handleCos = useCallback((v) => {
        return Math.cos(v)
    }, [])

    const handleSin = useCallback((v) => {
        return Math.sin(v)
    }, [])

    const handleTan = useCallback((v) => {
        return Math.tan(v)
    }, [])

    const handleCot = useCallback((v) => {
        return 1 / Math.tan(v);
    }, [])

    const handleBi = useCallback((v) => {
        if (parseInt(v) !== v) {
            setError(true)
        }

        return v.toString(2)
    }, [])

    const handleDec = useCallback((v) => {
        if (!/^[0-1]*$/.test(v.toString())) {
            setError(true)
        }

        return parseInt(v, 2)
    }, [])

    const handleDegree = useCallback((f, s) => {
        return f**s
    }, [])

    const handleDegreeOfTow = useCallback((v) => {
        return v**2
    }, [])

    const handleSquareRoot = useCallback((v) => {
        if (v < 0) {
            setError(true)
        }

        return Math.sqrt(v)
    }, [])

    const handleRoot = useCallback((f, s) => {
        if (f < 0) {
            setError(true)
        }

        return f**(1/s)
    }, [])

    const handleFact = useCallback((v) => {
        if (v < 0) {
            setError(true)
        }

        let res = 1

        for (let i = v; i > 0; i--) {
            res *= i
        }

        return res
    }, [])

    const handleExponent = useCallback(() => {
        return Math.E
    }, [])

    const operationHandlerMap = useMemo(() => {
      return new Map([
          [OPERATION.CHANGE_SIGN, handleChangeSigh],
          [OPERATION.PERCENT, handlePercent],
          [OPERATION.DIVISION, handleDivision],
          [OPERATION.MULTIPLY, handleMultiply],
          [OPERATION.ADDING, handleAdding],
          [OPERATION.SUBTRACTION, handleSubtract],
          [OPERATION.COS, handleCos],
          [OPERATION.SIN, handleSin],
          [OPERATION.TAN, handleTan],
          [OPERATION.COT, handleCot],
          [OPERATION.BINARY, handleBi],
          [OPERATION.FROM_BINARY, handleDec],
          [OPERATION.DEGREE, handleDegree],
          [OPERATION.DEGREE_OF_TWO, handleDegreeOfTow],
          [OPERATION.SQUARE_ROOT, handleSquareRoot],
          [OPERATION.ROOT, handleRoot],
          [OPERATION.FACT, handleFact],
          [OPERATION.EXPONENT, handleExponent],
      ])
    })

    return { operationHandlerMap, error, handleResetError }
}
