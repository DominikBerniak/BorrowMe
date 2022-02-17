import {createSlice} from "@reduxjs/toolkit";

export const locationSlice = createSlice({
    name: "voivodeships",
    initialState: {
        value: {
            voivodeships : []
        }
    },
    reducers: {
        setVoivodeships: (state, action) =>{
            state.value = action.payload
        },
    },

});

export const {setVoivodeships} = locationSlice.actions;

export default locationSlice.reducer;