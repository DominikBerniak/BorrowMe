import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    isActive: false,
    senderId: "",
    receiverId: "",
    receiverFullName: "",
    receiverPicture: "",
    reservationId: "",
    reservationDateStart: "",
    reservationDateEnd: "",
    announcementTitle: "",
    isAnnouncementSenders: false
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
