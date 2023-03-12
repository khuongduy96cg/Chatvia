import { configureStore, getDefaultMiddleware , ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '@/redux/slices/counterSlice';
import toastReducer from '@/redux/slices/toastSlice';
import spinnerReducer from '@/redux/slices/spinnerSlice';
import { api as userAPI } from '@/redux/slices/api/userAPISlice';

// const middleware = [...getDefaultMiddleware(), authMiddleware];

export const store = configureStore({
  reducer: {
    //auth: authSlice,
    counter: counterReducer,
    toast: toastReducer,
    spinner: spinnerReducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
