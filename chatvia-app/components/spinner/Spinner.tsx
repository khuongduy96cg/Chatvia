import { SpinnerState } from '@/interfaces/ISpinner'
import { RootState } from '@/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'

import styles from './spinner.module.css'

function Spinner() {
    const { value: loading } = useSelector((state: RootState) => state.spinner as SpinnerState)
    console.log('loading========', loading)
    return (
        <>
            {
                loading &&
                <div className={styles.container}>
                    <div className={styles.loader}>
                        <div className={styles.loader__dot}></div>
                        <div className={styles.loader__dot}></div>
                        <div className={styles.loader__dot}></div>
                        <div className={styles.loader__dot}></div>
                        <div className={styles.loader__dot}></div>
                        <div className={styles.loader__dot}></div>
                        {/* <div className={styles.loader__text}></div> */}
                    </div>
                </div>
            }
        </>
    )
}

export default Spinner
