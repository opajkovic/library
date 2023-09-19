import { createSlice } from "@reduxjs/toolkit";

const sortData = createSlice({
  name: "sort",
  initialState: {
    sortedData: [],
  },
  reducers: {
    sortedData(state, action) {
      state.sortedData = action.payload;
    },
  },
});

export const { sortedData } = sortData.actions;
export default sortData;
