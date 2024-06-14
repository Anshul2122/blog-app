import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: true,
    },
    reducers: {
        login(state) {
            state.isLogin = false;
        },
        logout(state) {
            state.isLogin = true;
        },
    },
});
export const authActions = authSlice.actions;

export const store = configureStore({
    reducer:authSlice.reducer,
})