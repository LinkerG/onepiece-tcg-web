import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@types"

interface UserState {
    user: User | null
}

const localStorageUser = localStorage.getItem('user')
const sessionStorageUser = sessionStorage.getItem('user')

let initialUserState;

if (localStorageUser)
    initialUserState = JSON.parse(localStorageUser)
else if (sessionStorageUser)
    initialUserState = JSON.parse(sessionStorageUser)
else
    initialUserState = null

const initialState: UserState = {
    user: initialUserState,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            if (state.user != null)
                sessionStorage.setItem('user', JSON.stringify(state.user));
        },
        setRememberUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            if (state.user != null)
                localStorage.setItem('user', JSON.stringify(state.user));
        },
        resetUser: (state) => {
            state.user = null
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
        },
    },
})

export const { setUser, setRememberUser, resetUser } = userSlice.actions;

export default userSlice.reducer;