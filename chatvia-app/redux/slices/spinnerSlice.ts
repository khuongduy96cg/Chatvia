import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/redux/store'
import { SpinnerState } from '@/interfaces/ISpinner'

// Define the initial state using that type
const initialState: SpinnerState = {
    value: false
}

export const spinnerSlice = createSlice({
    name: 'spinner',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        showHideLoading: (state, action: PayloadAction<boolean>) => {
            //console.log(action.payload)
            state.value = action.payload
        }
    }
})

export const { showHideLoading } = spinnerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isShowHideLoading = (state: RootState) => state.spinner.value

export default spinnerSlice.reducer