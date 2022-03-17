import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = [];

export const activeChatFetchedMessagesSlice = createSlice({
    name: "activeChatFetchedMessages",
    initialState: { value: initialStateValue },
    reducers: {
        changeActiveChatFetchedMessages: (state, action) => {
            state.value = action.payload
        },
        clearActiveChatFetchedMessages: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeActiveChatFetchedMessages, clearActiveChatFetchedMessages} = activeChatFetchedMessagesSlice.actions;

export default activeChatFetchedMessagesSlice.reducer;
