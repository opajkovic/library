export const getInvalidClass = (value, formIsSubmitted) => {
    return formIsSubmitted && value.toString().trim().length === 0
      ? "invalid"
      : "";
  };
  
  export const createChangeHandler = (key, setState) => (event) => {
    setState((prevItemInfo) => ({
      ...prevItemInfo,
      [key]: event.target.value,
    }));
  };
  