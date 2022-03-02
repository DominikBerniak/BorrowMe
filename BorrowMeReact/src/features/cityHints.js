import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = [];

export const cityHintsSlice = createSlice({
    name: "cityHints",
    initialState: { value: initialStateValue },
    reducers: {
        setCityHints: (state, action) => {
            state.value = action.payload
        },
        clearCityHints: state => {
            state.value = initialStateValue
        },
    },

});

export const {setCityHints ,clearCityHints} = cityHintsSlice.actions;

export default cityHintsSlice.reducer;