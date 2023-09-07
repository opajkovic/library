export const getInvalidClass = (value) => {
    return value.trim().length === 0
      ? "form-control invalid"
      : "form-control";
  };
  
  export const createChangeHandler = (key, setState) => (event) => {
    setState((prevItemInfo) => ({
      ...prevItemInfo,
      [key]: event.target.value,
    }));
  };
  