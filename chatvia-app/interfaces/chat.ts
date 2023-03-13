interface Message {
    _id: string;
    content: string;
    user_id_from: string;
    user_id_to: string;
    group_id?: string;
}

interface Chat {
    _id: string;
    user_id_own: string;
    users: [
        {
            user_id: string
        }
    ]
}

export type { Chat, Message }