import { searchedData } from "./search-data";
import { updateAuthorsData } from "./authors-data";
import { updateStudentsData } from "./student-data";
import { updateLibrariansData } from "./librarian-data";
import { updateBooksData } from "./books-data";

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

export const deleteStudent = (data, id ) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id)
      dispatch(updateStudentsData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};

export const deleteLibrarian = (data, id ) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id)
      dispatch(updateLibrariansData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};

export const deleteBook = (data, id ) => {
  return async (dispatch) => {
    try {
      const filteredData = data.filter((item) => item.id !== id)
      dispatch(updateBooksData(filteredData || []));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };
};