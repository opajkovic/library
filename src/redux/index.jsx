import { configureStore } from "@reduxjs/toolkit";
import searchData from "./search-data";
import newBookData from "./new-book-data";

const store = configureStore({
  reducer: { search: searchData.reducer, newBookData: newBookData.reducer },
});

export default store;
