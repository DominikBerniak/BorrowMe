import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    sortBy: "publishDate",
    sortDirection: "desc"
};

export const sortSlice = createSlice({
    name: "sort",
    initialState: { value: initialStateValue },
    reducers: {
        changeSort: (state, action) => {
            state.value = action.payload
        },
        clearSort: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeSort, clearSort} = sortSlice.actions;

export default sortSlice.reducer;