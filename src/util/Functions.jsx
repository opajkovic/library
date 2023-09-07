export const getInvalidClass = (value) => {
  if (value !== null) {
    return value.trim().length === 0 ? "form-control invalid" : "form-control";
  }
  return "form-control-invalid";
};

export const createChangeHandler = (key, setState) => (event) => {
  setState((prevItemInfo) => ({
    ...prevItemInfo,
    [key]: event.target.value,
  }));
};
