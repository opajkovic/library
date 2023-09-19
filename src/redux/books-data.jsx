import { createSlice } from "@reduxjs/toolkit";

const booksData = createSlice({
  name: "booksData",
  initialState: null,
  reducers: {
    updateBooksData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateBooksData } = booksData.actions;
export default booksData;
