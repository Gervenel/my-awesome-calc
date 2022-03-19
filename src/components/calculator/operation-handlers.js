import {OPERATION} from "../constants";

const handleChangeSigh = (value) => {
    if (value === 0) {
        return value
    }

    return value * -1
}

const handlePercent = (value) => {
    return value / 100
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

export const operationHandlerMap = new Map([
    [OPERATION.CHANGE_SIGN, handleChangeSigh],
    [OPERATION.PERCENT, handlePercent],
    [OPERATION.DIVISION, handleDivision],
    [OPERATION.MULTIPLY, handleMultiply],
    [OPERATION.ADDING, handleAdding],
    [OPERATION.SUBTRACTION, handleSubtract],
])
