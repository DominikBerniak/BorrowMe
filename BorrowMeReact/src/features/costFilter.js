import {createSlice} from "@reduxjs/toolkit";

const initialStateValue = {
    minCost: 0,
    maxCost: 50,
    checkedButton: ""
};

export const costFilterSlice = createSlice({
    name: "costFilter",
    initialState: { value: initialStateValue },
    reducers: {
        changeCostFilter: (state, action) => {
            state.value = action.payload
        },
        clearCostFilter: state => {
            state.value = initialStateValue
        }
    },

});

export const {changeCostFilter, clearCostFilter} = costFilterSlice.actions;

export default costFilterSlice.reducer;