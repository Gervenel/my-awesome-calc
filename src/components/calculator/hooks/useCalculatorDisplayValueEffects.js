import {useEffect} from "react";

export default function useCalculatorDisplayValueEffects(firstOperand, secondOperand, setValueToDisplay,) {
    /*
    * useEffect for second operand is the first just for the first rendering, cuz default value for the first rendering
    * should be the first operand value
    * */

    // To display second operand value
    useEffect(() => {
        setValueToDisplay(() => secondOperand)
    }, [setValueToDisplay, secondOperand])

    // To display first operand value
    useEffect(() => {
        setValueToDisplay(() => firstOperand)
    }, [setValueToDisplay, firstOperand])
}
