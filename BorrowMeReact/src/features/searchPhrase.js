import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = "";

export const searchPhraseSlice = createSlice({
    name: "searchPhrase",
    initialState: { value: initialStateValue },
    reducers: {
        changeSearchPhrase: (state, action) => {
            state.value = action.payload
        },
        clearSearchPhrase: (state) => {
            state.value = initialStateValue
        },
    },

});

export const {changeSearchPhrase, clearSearchPhrase} = searchPhraseSlice.actions;

export default searchPhraseSlice.reducer;