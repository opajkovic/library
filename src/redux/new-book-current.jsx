import { createSlice } from "@reduxjs/toolkit";

const bookData = {
  nazivKnjiga: "",
  kratki_sadrzaj: "",
  categories: "",
  genres: "",
  authors: "",
  izdavac: "",
  godinaIzdavanja: "",
  knjigaKolicina: "",
  brStrana: "",
  povez: "",
  format: "",
  pismo: "",
};

const newBookCurrentData = createSlice({
  name: "newBookData",
  initialState: bookData,
  reducers: {
    updateCurrentData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetCurrentData: () => bookData,
  },
});

export const { updateCurrentData, resetCurrentData } = newBookCurrentData.actions;
export default newBookCurrentData;
