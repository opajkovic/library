import { searchedData } from "./search-data";
import { updateAuthorsData } from "./authors-data";

export const filterSearchedData = (data, headers, inputValue ) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => {
        return headers.some((header) => {
          const columnValue = item[header.dataKey];
          if (typeof columnValue === 'string') {
            return columnValue.toLowerCase().includes(inputValue.toLowerCase());
          } else if (typeof columnValue === 'number') {
            return columnValue.toString().includes(inputValue);
          }
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