import { Message } from '@/interfaces/chat'
import { ROUTES } from '@/types/constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type MessagesResponse = Message[]

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: ROUTES.API }),
    tagTypes: ['Message'],
    endpoints: (build) => ({
        getMessages: build.query<MessagesResponse, void>({
            query: () => `${ROUTES.CHATS_API}${ROUTES.LIST_MESSAGES_API}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Message' as const, _id })),
                        { type: 'Message', id: 'LIST' },
                    ]
                    : [{ type: 'Message', id: 'LIST' }],
        }),
        addMessage: build.mutation<Message, Partial<Message>>({
            query: (body) => ({
                url: `${ROUTES.CHATS_API}${ROUTES.ADD_MESSAGE_API}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Message', id: 'LIST' }],
        }),
    })
})

export const {
    useGetMessagesQuery,
    useAddMessageMutation,
} = api