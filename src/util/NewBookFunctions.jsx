import api from "../api/apiCalls";

export const blurHandler = (setClickedState) => () => {
  setClickedState(true);
};

export const getClasses = (isValid, isClicked) => {
  return !isValid && isClicked ? "form-control invalid" : "form-control";
};

export const fetchAuthors = async () => {
  try {
    const response = await api.get(`/authors`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
