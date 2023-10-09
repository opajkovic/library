import { createSlice } from "@reduxjs/toolkit";

const borrowedBooksData = createSlice({
  name: "borrowedBooksData",
  initialState: null,
  reducers: {
    updateBorrowedBooksData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateBorrowedBooksData } = borrowedBooksData.actions;
export default borrowedBooksData;
