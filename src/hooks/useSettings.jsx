import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLoaderData } from "react-router";
import { filterSearchedData } from "../redux/actions";

export function useSettingsData(headers) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setData(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setData(searchData);
    } else {
      setData(fetchedData);
    }
  }, [search, fetchedData]);

  const handleClick = () => {
    navigate("./new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return {
    dataToDisplay,
    pageCount,
    handlePageClick,
    itemPerPageHandler,
    handleGlobalSearch,
    searchColumn: (headerName, searchValue) => {
      handleColumnSearch(headerName, searchValue);
    },
    handleClick,
  };
}
