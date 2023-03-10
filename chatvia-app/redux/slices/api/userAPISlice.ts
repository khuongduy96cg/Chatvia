import { User } from '@/interfaces/auth'
import { ROUTES } from '@/types/constant'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//https://codesandbox.io/s/github/reduxjs/redux-toolkit/tree/master/examples/query/react/optimistic-update?from-embed=&file=/src/app/services/posts.ts:1433-1447
type UsersResponse = User[]

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `${ROUTES.API}` }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query<User, string>({
            query: (_id) => `${ROUTES.USERS_API}/${_id}`,
            providesTags: (result, error, _id) => [{ type: 'User', _id }]
        }),
        getPosts: build.query<UsersResponse, void>({
            query: () => `${ROUTES.USERS_API}`,
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'User' as const, _id })),
                        { type: 'User', _id: 'LIST' },
                    ]
                    : [{ type: 'User', _id: 'LIST' }],
        }),
        createUser: build.mutation<User, Partial<User>>({
            query: (body) => ({
                url: `${ROUTES.USERS_API}${ROUTES.CREATE_USER_API}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),
        updateUser: build.mutation<void, Pick<User, '_id'> & Partial<User>>({
            query: ({ _id, ...patch }) => ({
                url: `${ROUTES.USERS_API}/${_id}`,
                method: 'PUT',
                body: patch,
            }),
            async onQueryStarted({ _id, ...patch }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getUser', _id as string, (draft) => {
                        Object.assign(draft, patch)
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
            invalidatesTags: (result, error, { _id }) => [{ type: 'User', _id }],
        }),
        deleteUser: build.mutation<{ success: boolean; _id: string }, string>({
            query(_id) {
                return {
                    url: `${ROUTES.USERS_API}/${_id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, _id) => [{ type: 'User', _id }],
        }),
    })
})

export const {
    useCreateUserMutation
 } = api