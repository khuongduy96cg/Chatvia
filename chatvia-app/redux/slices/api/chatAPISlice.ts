import { Chat } from '@/interfaces/chat'
import { ROUTES } from '@/types/constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ChatsResponse = Chat[]

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: ROUTES.API }),
    tagTypes: ['Chat'],
    endpoints: (build) => ({
        getChats: build.query<ChatsResponse, void>({
            query: () => `${ROUTES.CHATS_API}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Chat' as const, _id })),
                        { type: 'Chat', id: 'LIST' },
                    ]
                    : [{ type: 'Chat', id: 'LIST' }],
        }),
        getChat: build.query<Chat, string>({
            query: (_id) => `${ROUTES.CHATS_API}/${_id}`,
            providesTags: (result, error, _id) => [{ type: 'Chat', _id }],
        }),
        addChat: build.mutation<Chat, Partial<Chat>>({
            query: (body) => ({
                url: `${ROUTES.CHATS_API}${ROUTES.ADD_CHAT_API}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
        }),
        updateChat: build.mutation<void, Pick<Chat, '_id'> & Partial<Chat>>({
            query: ({ _id, ...patch }) => ({
                url: `${ROUTES.CHATS_API}${ROUTES.UPDATE_CHAT_API}/${_id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getChat', _id, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, { _id }) => [{ type: 'Chat', _id }],
        }),
    })
})

export const {
    useGetChatsQuery,
    useGetChatQuery,
    useAddChatMutation,
    useUpdateChatMutation,
} = api