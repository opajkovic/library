import { configureStore } from "@reduxjs/toolkit";
import searchData from "./search-data";
import authorsData from "./authors-data";
import studentsData from "./student-data";
import librariansData from "./librarian-data";
import booksData from "./books-data";
import newBookData from "./new-book-data";
import newBookCurrentData from "./new-book-current";
import editBookData from "./edit-book-data";
import sortData from "./sort-data";
import rentingData from "./renting-books";

const store = configureStore({
  reducer: {
    sort: sortData.reducer,
    search: searchData.reducer,
    newBookCurrent: newBookCurrentData.reducer,
    newBookData: newBookData.reducer,
    editBookData: editBookData.reducer,
    authors: authorsData.reducer,
    students: studentsData.reducer,
    librarians: librariansData.reducer,
    books: booksData.reducer,
    rentingBooks: rentingData.reducer,
  },
});

export default store;
