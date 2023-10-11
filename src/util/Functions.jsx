export const getInvalidClass = (value) => {
  if (typeof value === "number") {
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
  const filteredData = dataArray.filter((item) => item.name === filterValue);

  if (filteredData.length === 0) {
    return false;
  }

  return filteredData.map((item) => +item.id);
};

export function transformBookData(data) {
  return data.map((item) => {
    return {
      id: item.id || null,
      name: item.title || null,
      author: `${(item.authors && item.authors[0]?.name) || ""} ${
        (item.authors && item.authors[0]?.surname) || ""
      }`,
      category: (item.categories && item.categories[0]?.name) || null,
      available: item.samples,
      reserved: item.rSamples,
      rented: item.bSamples,
      excess: item.fSamples,
      total: item.samples || null,
      authors: [{ id: item.authors.length > 0 ? item.authors[0].id : 0 }],
    };
  });
}
