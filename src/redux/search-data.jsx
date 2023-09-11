import { createSlice } from "@reduxjs/toolkit";

const searchData = createSlice({
  name: "search",
  initialState: {
    searchData: []
  },
  reducers: {
    searchedData(state, action) {
      state.searchData = action.payload;
    },
  },
});

export const { searchedData } = searchData.actions;
export default searchData;
