import {createSlice} from "@reduxjs/toolkit";

export const allCategoriesSlice = createSlice({
    name: "allCategories",
    initialState: { value: [] },
    reducers: {
        changeAllCategories: (state, action) => {
            state.value = action.payload
        }
    },

});

export const {changeAllCategories} = allCategoriesSlice.actions;

export default allCategoriesSlice.reducer;