import React from 'react'
import Calculator from "./calculator";

import styles from './styles.module.css'

export default function Main() {
    return (
        <main className={styles.wrapper}>
            <Calculator />
        </main>
    )
}
