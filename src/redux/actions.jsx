import { searchedData } from "./search-data";
import { updateAuthorsData } from "./authors-data";

export const filterSearchedData = (data, headers, inputValue ) => {
  console.log(data)
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => {
        return headers.some((header) => {
          const columnValue = item[header.dataKey];
          return columnValue.toLowerCase().includes(inputValue);
        });
      });

      dispatch(searchedData(filteredData || []));
    } catch (error) {
      console.error("Error filtering/searching data:", error);
    }
  };
};

export const deleteAuthor = (data, id ) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id)
      dispatch(updateAuthorsData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};