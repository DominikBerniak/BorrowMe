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
        setLocation: (state, action) => {
            state.value = action.payload
        },
    },

});

export const {setLocation} = locationSlice.actions;

export default locationSlice.reducer;