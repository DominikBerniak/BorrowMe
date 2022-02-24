import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    city: "",
    voivodeship: "",
    input: ""
};
export const locationSlice = createSlice({
    name: "location",
    initialState: { value: initialStateValue },
    reducers: {
        changeLocation: (state, action) => {
            state.value = action.payload
        },
        clearLocation: state => {
            state.value = initialStateValue
        },
    },

});

export const {changeLocation, clearLocation} = locationSlice.actions;

export default locationSlice.reducer;