import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        adults: 1,
        child: 0,
        baby: 0,
        roomType: "Эконом",
        nights: 1,
        insurance: false,
    },
    totalCost: 0,
};

const step1Slice = createSlice({
    name: "step1",
    initialState,
    reducers: {
        calculateTotalCost: (state, action) => {
            // Calculate the total cost based on form data and update state.totalCost
        },
    },
});

export const { calculateTotalCost } = step1Slice.actions;
export default step1Slice.reducer;
