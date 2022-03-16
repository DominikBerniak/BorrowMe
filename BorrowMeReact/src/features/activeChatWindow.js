import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    isActive: true,
    senderId: "048FDB33-02BD-4001-C6FE-08DA04FBAAE1",
    receiverId: "51406FF0-0AE6-4DE7-068C-08DA05DE786C",
    reservationId: "B797EC13-230A-42BC-9CFC-E636966E1C48"
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
