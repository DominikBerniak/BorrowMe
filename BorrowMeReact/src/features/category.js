import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    mainCategory: "",
    subCategory: ""
};

export const categorySlice = createSlice({
    name: "category",
    initialState: { value: initialStateValue },
    reducers: {
        changeCategory: (state, action) => {
            state.value = action.payload
        },
        clearCategory: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeCategory, clearCategory} = categorySlice.actions;

export default categorySlice.reducer;