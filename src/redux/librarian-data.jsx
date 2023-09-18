import { createSlice } from "@reduxjs/toolkit";

const librariansData = createSlice({
  name: "librarianData",
  initialState: null,
  reducers: {
    updateLibrariansData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateLibrariansData } = librariansData.actions;
export default librariansData;
