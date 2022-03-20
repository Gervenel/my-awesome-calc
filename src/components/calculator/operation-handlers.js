import {OPERATION} from "../constants";

const handleChangeSigh = (v) => {
    if (v === 0) {
        return v
    }

    return v * -1
}

const handlePercent = (v) => {
    return v / 100
}

const handleDivision = (f, s) => {
    return f / s
}

const handleMultiply = (f, s) => {
    return f * s
}

const handleAdding = (f, s) => {
    return f + s
}

const handleSubtract = (f, s) => {
    return f - s
}

const handleCos = (v) => {
    return Math.cos(v)
}

const handleSin = (v) => {
    return Math.sin(v)
}

const handleTan = (v) => {
    return Math.tan(v)
}

const handleCot = (v) => {
    return 1 / Math.tan(v);
}

const handleBi = v => {
    return v.toString(2)
}

const handleDec = v => {
    return parseInt(v, 2)
}

const handleDegree = (f, s) => {
    return f**s
}

const handleDegreeOfTow = v => {
    return v**2
}

const handleSquareRoot = v => {
    return Math.sqrt(v)
}

const handleRoot = (f, s) => {
    return f**(1/s)
}

const handleFact = v => {
    let res = 1

    for (let i = v; i > 0; i--) {
        res *= i
    }

    return res
}

const handleExponent = () => {
    return Math.E
}

export const operationHandlerMap = new Map([
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
