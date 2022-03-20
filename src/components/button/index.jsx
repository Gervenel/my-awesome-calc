import React, {useCallback} from 'react'

import styles from './styles.module.css'

export default function Button({ children, className, backgroundColor, width, height, value, handleClick }) {
    const onClick = useCallback(() => {
        handleClick(value ?? children)
    }, [value, children, handleClick])

    let additionalProps = {}

    if (value) {
        additionalProps.dangerouslySetInnerHTML = {__html: value}
    } else {
        additionalProps.children = children
    }

    return (
        <div
            onClick={onClick}
            className={`${styles.button} ${className}`}
            style={{
                backgroundColor: backgroundColor,
                width: width,
                height: height
            }}
            {...additionalProps}
        />
    )
}
