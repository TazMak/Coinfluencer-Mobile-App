import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import coinReducer from './coinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
