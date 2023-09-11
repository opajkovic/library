import { searchedData } from "./search-data";

export const filterSearchedData = (data, headers, inputValue ) => {
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
