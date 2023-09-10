import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchData: [],
  },
  reducers: {
    fetchData(state, action) {
      state.searchData = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice;
