import { configureStore } from "@reduxjs/toolkit";
import searchData from "./search-data";


const store = configureStore({
    reducer: {search: searchData.reducer}
})

export default store;