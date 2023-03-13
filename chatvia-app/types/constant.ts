const NEXTAUTH_STATUS = {
    AUTHENTICATED: 'authenticated',
    LOADING: 'loading',
    UNAUTHENTICATED: 'unauthenticated'
}

const NEXTAUTH_TYPE = {
    CREDENTIALS: 'credentials',
    GOOGLE: 'google'
}

const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    HOME: '/home',
    API: '/api',
    USERS_API: '/users',
    CREATE_USER_API: '/create-user',
    CHATS_API: '/chats',
    ADD_CHAT_API: '/add-chat',
    UPDATE_CHAT_API: '/update-chat',
    LIST_MESSAGES_API: '/list-messages',
    ADD_MESSAGE_API: '/add-message',
}

const SOCKET_IO_API = {
    SOCKET_IO: '/api/chats/socketio',
    CHAT: '/api/chats'
}

export { NEXTAUTH_STATUS, NEXTAUTH_TYPE, ROUTES, SOCKET_IO_API }