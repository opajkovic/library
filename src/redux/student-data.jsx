import { createSlice } from "@reduxjs/toolkit";

const studentsData = createSlice({
  name: "studentsData",
  initialState: null,
  reducers: {
    updateStudentsData: (state, action) => {
      return action.payload;
    },
  },
});

export const { updateStudentsData } = studentsData.actions;
export default studentsData;
