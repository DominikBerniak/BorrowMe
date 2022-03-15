import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    isActive: true,
    senderEmail: "",
    receiverEmail: "",
    announcementId: ""

};

export const activeChatWindowSlice = createSlice({
    name: "activeChatWindow",
    initialState: { value: initialStateValue },
    reducers: {
        changeActiveChatWindow: (state, action) => {
            state.value = action.payload
        },
        clearActiveChatWindow: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeActiveChatWindow, clearActiveChatWindow} = activeChatWindowSlice.actions;

export default activeChatWindowSlice.reducer;
