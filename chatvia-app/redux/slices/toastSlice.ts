import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { ToastState } from '@/interfaces/Itoast'

// Define the initial state using that type
const initialState: any = {
    value: {
        isShow: false,
        message: '',
        isError: false,
        config: {}
    } as ToastState
}

export const toastSlice = createSlice({
    name: 'toast',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        toastEmitter: (state, action: PayloadAction<ToastState>) => {
            console.log(action)
            state.value = action.payload
        }
    }
})

export const { toastEmitter } = toastSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectToast = (state: RootState) => state.toast

export default toastSlice.reducer