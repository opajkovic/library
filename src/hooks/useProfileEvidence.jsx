import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateRentingData } from "../redux/renting-books";
import { filterSearchedData } from "../redux/actions";
import { userInfoLoader } from "../util/UserInfo";

export function useProfileEvidence(headers) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState();
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState();
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchData = useLoaderData();
  const searchedData = useSelector((state) => state.search.searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    if (fetchData && fetchData.length !== 0) {
      dispatch(updateRentingData(fetchData));
      setData(fetchData);
      setSearchData(fetchData);
      userInfoLoader(id, setUserInfo, navigate);
    }
  }, [fetchData]);

  useEffect(() => {
    if (search !== "") {
      setData(filterSearchedData(fetchData, headers, search));
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (searchedData !== null && searchedData.length !== 0) {
        setData(searchedData);
      }
    }
  }, [search, searchedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(searchData, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return {
    searchColumn: (headerName, searchValue) => {
      handleColumnSearch(headerName, searchValue);
    },
    searchGlobal: handleGlobalSearch,
    itemsPerPageHandler: itemPerPageHandler,
    onPageChange: handlePageClick,
    pageCount: pageCount,
    tableData: dataToDisplay,
    userInfo: userInfo,
  };
}
