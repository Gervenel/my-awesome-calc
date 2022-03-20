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
    CHANGE_SIGN: '&#177;',
    PERCENT: '&#37;',
    DIVISION: '&divide;',
    MULTIPLY: '&times;',
    ADDING: '&plus;',
    SUBTRACTION: '&minus;',

    CLEAR: 'AC',
    CALCULATE: '&equals;',
    REMOVE_ONE: '&#8701;',
    EXPONENT: 'e',

    COS: 'cos',
    SIN: 'sin',
    TAN: 'tan',
    COT: 'cot',
    BINARY: 'bi',
    FROM_BINARY: 'dec',
    DEGREE: 'X<sup>^y</sup>',
    DEGREE_OF_TWO: 'X<sup>^2</sup>',
    SQUARE_ROOT: '<span>&radic; <sup>2</sup></span>',
    ROOT: '&radic;',
    FACT: 'x!',
}

export const OPERANDS = Object.values(OPERAND)
export const OPERATIONS = Object.values(OPERATION)
export const OPERATIONS_WITH_ONE_OPERAND = [
    OPERATION.CHANGE_SIGN,
    OPERATION.PERCENT,
    OPERATION.COS,
    OPERATION.SIN,
    OPERATION.TAN,
    OPERATION.COT,
    OPERATION.BINARY,
    OPERATION.FROM_BINARY,
    OPERATION.DEGREE_OF_TWO,
    OPERATION.SQUARE_ROOT,
    OPERATION.FACT,
]
export const OPERATIONS_WITH_TWO_OPERANDS = [
    OPERATION.DIVISION,
    OPERATION.MULTIPLY,
    OPERATION.ADDING,
    OPERATION.SUBTRACTION,
    OPERATION.DEGREE,
    OPERATION.ROOT,
]
