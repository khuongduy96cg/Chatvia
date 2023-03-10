import React from 'react'
import Image from 'next/image';

import styles from '@/pages/home/home.module.css'

interface Props {
    userName: string;
    message: string;
    date: string;
    avatarSrc?: string;
    isActive?: boolean | string;
    isOnline?: boolean | string;
    isGroup?: boolean | string;
}

function Message(props: Props) {
    let msgClass = `${styles.msg}`
    if (props.isActive == true) {
        msgClass = `${styles.msg} ${styles.active}`
        if (props.isOnline == true) {
            msgClass = `${styles.msg} ${styles.active} ${styles.online}`
        }
    }
    else {
        if (props.isOnline == true) {
            msgClass = `${styles.msg} ${styles.online}`
        }
    }

    return (
        <div className={msgClass}>
            {
                props.isGroup == true
                    ? <div className={`${styles.msg_profile} ${styles.group}`}>
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
                            <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zM12 22v-6.5" />
                            <path d="M22 8.5l-10 7-10-7" />
                            <path d="M2 15.5l10-7 10 7M12 2v6.5" /></svg>
                    </div>
                    : <Image className={styles.msg_profile}
                        src={props.avatarSrc || ''}
                        alt=""
                        width={60}
                        height={60} />
            }

            <div className={styles.msg_detail}>
                <div className={styles.msg_username}>{props.userName}</div>
                <div className={styles.msg_content}>
                    <span className={styles.msg_message}>{props.message}</span>
                    <span className={styles.msg_date}>{props.date}</span>
                </div>
            </div>
        </div>
    )
}

export default Message
