import { configureStore } from "@reduxjs/toolkit";
import searchData from "./search-data";
import newBookData from "./new-book-data";
import authorsData from "./authors-data";

const store = configureStore({
  reducer: {
    search: searchData.reducer,
    newBookData: newBookData.reducer,
    authors: authorsData.reducer,
  },
});

export default store;
