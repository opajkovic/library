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
  jezik: 2,
  povez: "",
  format: "",
  isbn: "",
  deletePdfs: 0,
  pismo: "",
};

const newBookData = createSlice({
  name: "newBookData",
  initialState: bookData,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormData: () => bookData,
  },
});

export const { updateFormData, resetFormData } = newBookData.actions;
export default newBookData;
