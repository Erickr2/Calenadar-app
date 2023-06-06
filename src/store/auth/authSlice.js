import { createSlice } from '@reduxjs/toolkit'

//vamos atener el user como un obj vacio para poder acceder a el
const initialState = {
    status: 'cheking',
    user: {},
    errorMessage: undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onCheking: (state) => {
            state.status = 'cheking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.user = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    },
})
// Action creators are generated for each case reducer function
export const { onCheking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;