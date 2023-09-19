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
  jezik: 2,
  deletePdfs: 0,
  isbn: "",
};

const editBookData = createSlice({
  name: "newBookData",
  initialState: bookData,
  reducers: {
    updateEditData: (state, action) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { updateEditData } = editBookData.actions;
export default editBookData;