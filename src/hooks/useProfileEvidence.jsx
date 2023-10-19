import { useEffect, useState } from "react";
import { useLoaderData, useParams, useNavigate } from "react-router";
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
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchData = useLoaderData();
  const searchedData = useSelector((state) => state.search.searchData);
  const rentingData = useSelector((state) => state.rentingBooks);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  const userDataFetcher = async () => {
    const userData = await userInfoLoader(id, navigate);
    setUserInfo(userData);
  };

  useEffect(() => {
    if (fetchData && fetchData.length !== 0) {
      dispatch(updateRentingData(fetchData));
      setData(fetchData);
      setSearchData(fetchData);
      userDataFetcher();
    }
  }, [fetchData, navigate]);

  useEffect(() => {
    if (search !== "") {
      setData(searchedData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (rentingData !== null && rentingData.length !== 0) {
        setData(rentingData);
      }
    }
  }, [search, rentingData]);

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

  console.log(userInfo);
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
