import { createSlice } from "@reduxjs/toolkit";

const authorsData = createSlice({
  name: "newBookData",
  initialState: null,
  reducers: {
    updateAuthorsData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateAuthorsData } = authorsData.actions;
export default authorsData;
