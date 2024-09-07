import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Card } from "@types"

interface CardState {
    card: Card | null
}

const initialState: CardState = {
    card: null,
}

const cardSlice = createSlice({
    name: "centeredCard",
    initialState,
    reducers: {
        setCenteredCard: (state, action: PayloadAction<Card | null>) => {
            state.card = action.payload
        },
        resetCenteredCard: (state) => {
            state.card = null
        },
    },
})

export const { setCenteredCard, resetCenteredCard } = cardSlice.actions;

export default cardSlice.reducer;