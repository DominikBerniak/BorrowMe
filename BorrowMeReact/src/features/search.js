import {createSlice} from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        value: {
            category: "all",
            voivodeship: "all",
            city: "all",
            searchPhrase: "all"
        }
    },
    reducers: {
        search: (state, action) =>{
            state.value = action.payload
        },
    },

});

export const {search} = searchSlice.actions;

export default searchSlice.reducer;