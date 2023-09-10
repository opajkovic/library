import api from "../api/apiCalls";
import { searchActions } from "./search-slice";

export const fetchSearchData = (headers, value, headline) => {
  return async (dispatch) => {
    const fetchingData = async () => {
      const response = await api.get(headline);
      let responseData;
      if (headline === "/users") {
        responseData = response.data.data.filter(
          (item) => item.role === "Bibliotekar"
        );
      } else {
        responseData = response.data.data;
      }
      const filteredData = responseData.filter((item) => {
        return headers.some((header) => {
          const columnValue = item[header.dataKey];
          return columnValue.toLowerCase().includes(value);
        });
      });

      return filteredData;
    };

    try {
      const filteredData = await fetchingData();
      dispatch(
        searchActions.fetchData({
          searchData: filteredData || [],
        })
      );
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };
};
