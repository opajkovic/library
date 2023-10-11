import { useState, useEffect } from "react";
import { useNavigate, useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { filterSearchedData } from "../redux/actions";
import { sortedData } from "../redux/sort-data";
import { sortData } from "../redux/actions";
import { auth } from "../services/AuthService";
import { transformBookData } from "../util/Functions";

export function useSidebarData(
  headers,
  endpoint,
  deleteAction,
  updateAction,
  navigatePath
) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const updatedSortedData = useSelector((state) => state.sort.sortedData);
  const dataFromStore = useSelector((state) => state[endpoint]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    if (endpoint === "books") {
      const transformedData = transformBookData(fetchedData);
      dispatch(updateAction(transformedData));
      setData(transformedData);
      dispatch(sortedData(transformedData));
    } else {
      dispatch(updateAction(fetchedData));
      setData(fetchedData);
      dispatch(sortedData(fetchedData));
    }
  }, []);

  useEffect(() => {
    if (search !== "") {
      setData(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    } else {
      if (dataFromStore !== null) {
        setData(dataFromStore);
      }
    }
  }, [search]);

  const handleClick = () => {
    navigate(navigatePath);
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(dataFromStore, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(dataFromStore, headerName, searchValue));
  };

  const handleSort = () => {
    dispatch(sortData(data));
  };

  useEffect(() => {
    setData(updatedSortedData);
  }, [updatedSortedData]);

  const handleDelete = async (id) => {
    if (auth.adminRole()) {
      try {
        await api.delete(`/${endpoint}/${id}`);
        toast.success(`Podatak je uspješno izbrisan!`);
        dispatch(deleteAction(dataFromStore, id));

        if (search !== "") {
          setData(searchData.filter((item) => item.id !== id));
        } else {
          setData(dataFromStore.filter((item) => item.id !== id));
        }
      } catch (err) {
        toast.error(
          `message: ${err.response.data.message}, data: ${err.response.data.data}`
        );
      }
    } else {
      toast.error(`Neautorizovanim korisnicima nije omogućena ova opcija!`);
    }
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
    handleSort,
    handleClick,
    handleDelete,
    handleColumnSearch: (headerName, searchValue) => {
      handleColumnSearch(headerName, searchValue);
    },
  };
}
