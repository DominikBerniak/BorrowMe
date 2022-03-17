import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    pictureName: "",
    reputationPoints: 0
};

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        changeUser: (state, action) => {
            state.value = action.payload
        },
        clearUser: state => {
            state.value = initialStateValue
        }
    },
});

export const {changeUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
