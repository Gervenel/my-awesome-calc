import React, {useCallback} from 'react'

import styles from './styles.module.css'

export default function Button({ children, className, backgroundColor, width, height, handleClick }) {
    const onClick = useCallback(() => {
        handleClick(children)
    }, [children, handleClick])

    return (
        <div
            onClick={onClick}
            className={`${styles.button} ${className}`}
            style={{
                backgroundColor: backgroundColor,
                width: width,
                height: height
            }}
        >
            {children}
        </div>
    )
}
