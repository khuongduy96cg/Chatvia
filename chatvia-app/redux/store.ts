import { configureStore, getDefaultMiddleware , ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '@/redux/slices/counterSlice';
import toastReducer from '@/redux/slices/toastSlice';

// const middleware = [...getDefaultMiddleware(), authMiddleware];

export const store = configureStore({
  reducer: {
    //auth: authSlice,
    counter: counterReducer,
    toast: toastReducer
  },
  //middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
