import { createSlice } from "@reduxjs/toolkit";

const rentingData = createSlice({
  name: "rentingData",
  initialState: null,
  reducers: {
    updateRentingData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateRentingData } = rentingData.actions;
export default rentingData;
