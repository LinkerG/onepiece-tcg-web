// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import cardSearchSlice from './slices/cardSearch';

export const store = configureStore({
    reducer: {
        user: userSlice,
        cardSearch: cardSearchSlice
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch