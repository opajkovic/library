import { searchedData } from "./search-data";
import { sortedData } from "./sort-data";
import { updateAuthorsData } from "./authors-data";
import { updateStudentsData } from "./student-data";
import { updateLibrariansData } from "./librarian-data";
import { updateBooksData } from "./books-data";

export const filterSearchedData = (data, headers, inputValue) => {

  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => {
        return headers.some((header) => {
          let columnValue = "";
          if (!header.dataKey.includes(".")) {
            const splitDataKey = header.dataKey.split("+");
            if (splitDataKey.length > 1) {
              columnValue = item[splitDataKey[0]] + " " + item[splitDataKey[1]];
            } else if (splitDataKey.length === 1) {
              columnValue = item[header.dataKey];
            }
          } else {
            if (header.dataKey.includes("+")) {
              const splitPlus = header.dataKey.split("+");
              const splitPlusFirst = splitPlus[0].split(".");
              const splitPlusSecond = splitPlus[1].split(".");
              columnValue =
                item[splitPlusFirst[0]][splitPlusFirst[1]] +
                " " +
                item[splitPlusSecond[0]][splitPlusSecond[1]];
            } else {
              const splitDot = header.dataKey.split(".");
              columnValue = item[splitDot[0]][splitDot[1]];
            }
          }

          if (typeof columnValue === "string") {
            return columnValue.toLowerCase().includes(inputValue.toLowerCase());
          } else if (typeof columnValue === "number") {
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

export const sortData = (data) => {
  return (dispatch) => {
    try {
      const sortData = data
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
      dispatch(sortedData(sortData));
    } catch (error) {
      console.error("Error filtering/searching data:", error);
    }
  };
};

export const deleteAuthor = (data, id) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id);
      dispatch(updateAuthorsData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};

export const deleteStudent = (data, id) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id);
      dispatch(updateStudentsData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};

export const deleteLibrarian = (data, id) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id);
      dispatch(updateLibrariansData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};

export const deleteBook = (data, id) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id);
      dispatch(updateBooksData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};
