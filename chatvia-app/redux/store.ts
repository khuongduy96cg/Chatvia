import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '@/redux/slices/counterSlice';
import toastReducer from '@/redux/slices/toastSlice';
import spinnerReducer from '@/redux/slices/spinnerSlice';
import { api as userAPI } from '@/redux/slices/api/userAPISlice';
import { api as chatAPI } from '@/redux/slices/api/chatAPISlice';
import { api as messageAPI } from '@/redux/slices/api/messageAPISlice';

export const store = configureStore({
  reducer: {
    //auth: authSlice,
    counter: counterReducer,
    toast: toastReducer,
    spinner: spinnerReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [messageAPI.reducerPath]: messageAPI.reducer,
  },
  //middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), userAPI.middleware, chatAPI.middleware],
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: [userAPI.middleware, chatAPI.middleware, messageAPI.middleware]
    },
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
