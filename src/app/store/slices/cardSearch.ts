import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsQuery } from '@types'; // Asegúrate de que esta importación sea correcta

interface CardSearchState {
    query: CardsQuery;
}

const initialState: CardSearchState = {
    query: {},
};

const searchSlice = createSlice({
    name: 'cardSearch',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<CardsQuery>) => {
            state.query = action.payload;
        },
        clearQuery: (state) => {
            state.query = {};
        },
    },
});

export const { setQuery, clearQuery } = searchSlice.actions;

export default searchSlice.reducer;
