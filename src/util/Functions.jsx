import { useState, useEffect } from "react";

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

export function transformBookData(data) {
  console.log(data)
  return data.map((item) => ({
    id: item.id,
    name: item.title,
    author: `${item.authors[0].name} ${item.authors[0].surname}`,
    category: item.categories[0].name,
    available: item.samples,
    reserved: item.rSamples,
    rented: item.bSamples,
    excess: item.fSamples,
    total: item.samples,
  }));
}