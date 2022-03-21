import React from 'react'

import styles from './styles.module.css'

export default function Emoji({error}) {
    return (
        <div className={styles.wrapper}>
            {error ? <span className={styles.emoji}>&#128557;</span> : <span className={styles.emoji}>&#128513;</span>}
        </div>
    )
}
