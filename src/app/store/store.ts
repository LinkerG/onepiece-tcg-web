import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import cardSearchSlice from './slices/cardSearch';
import centeredCardSlice from './slices/centeredCard';

export const store = configureStore({
    reducer: {
        user: userSlice,
        cardSearch: cardSearchSlice,
        centeredCard: centeredCardSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch