import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = "";

export const categorySlice = createSlice({
    name: "category",
    initialState: { value: initialStateValue },
    reducers: {
        changeCategory: (state, action) => {
            state.value = action.payload
        },
    },

});

export const {changeCategory} = categorySlice.actions;

export default categorySlice.reducer;