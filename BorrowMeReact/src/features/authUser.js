import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    status: "initial",
    userId: "",
    roles: []
};

export const authUserSlice = createSlice({
    name: "authUser",
    initialState: { value: initialStateValue },
    reducers: {
        changeAuthUser: (state, action) => {
            state.value = action.payload
        },
        clearAuthUser: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeAuthUser, clearAuthUser} = authUserSlice.actions;

export default authUserSlice.reducer;