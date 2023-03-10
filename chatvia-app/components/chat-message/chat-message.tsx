import React from 'react'

import styles from '@/pages/home/home.module.css'
import Image from 'next/image';

interface Props {
    isOwner?: boolean | string;
    avatarSrc?: string;
    dateSeen?: string;
    children?: any;
}

function ChatMessage(props: Props) {
    return (
        <div className={`${styles.chat_msg} ${props.isOwner == true ? styles.owner: ''}`}>
            <div className={styles.chat_msg_profile}>
                <Image className={styles.chat_msg_img} src={props.avatarSrc || ""} alt="" width={40} height={40} />
                {
                    props.dateSeen ? <div className={styles.chat_msg_date}>Message seen {props.dateSeen}</div> : <></>
                }
            </div>
            <div className={styles.chat_msg_content}>
                {props.children}
            </div>
        </div>
    )
}

export default ChatMessage
