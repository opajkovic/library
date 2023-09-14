export const getInvalidClass = (value) => {
  if (typeof value === 'number') {
    return value === "" ? "form-control invalid" : "form-control";
  }

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

export const filterAndMap = (dataArray, filterValue) => {
  return +dataArray
    .filter((item) => item.name === filterValue)
    .map((item) => +item.id);
};
