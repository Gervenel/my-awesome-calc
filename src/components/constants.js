export const DEFAULT_CALCULATOR_VALUE = '0'

export const OPERAND = {
    ZERO: '0',
    ONE: '1',
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    DOT: '.',
}

export const OPERATION = {
    CLEAR: 'AC',
    CHANGE_SIGN: '+/-',
    PERCENT: '%',
    DIVISION: '/',
    MULTIPLY: 'X',
    ADDING: '+',
    SUBTRACTION: '-',
    CALCULATE: '='
}

export const OPERANDS = Object.values(OPERAND)
export const OPERATIONS = Object.values(OPERATION)
export const OPERATIONS_WITH_ONE_OPERAND = [
    OPERATION.CHANGE_SIGN,
    OPERATION.PERCENT
]
export const OPERATIONS_WITH_TWO_OPERANDS = [
    OPERATION.DIVISION,
    OPERATION.MULTIPLY,
    OPERATION.ADDING,
    OPERATION.SUBTRACTION,
]
