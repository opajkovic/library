import { configureStore } from "@reduxjs/toolkit";
import searchData from "./search-data";
import newBookData from "./new-book-data";
import authorsData from "./authors-data";
import studentsData from "./student-data";
import librariansData from "./librarian-data";
import newBookCurrentData from "./new-book-current";

const store = configureStore({
  reducer: {
    search: searchData.reducer,
    newBookData: newBookData.reducer,
    authors: authorsData.reducer,
    students: studentsData.reducer,
    librarians: librariansData.reducer,
    newBookCurrent: newBookCurrentData.reducer
  },
});

export default store;
