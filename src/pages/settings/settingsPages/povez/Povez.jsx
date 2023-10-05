import React, { useEffect, useState} from "react";
import "./povez.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchedData } from "../../../../redux/actions";
import { auth } from "../../../../services/AuthService";

const headers = [{ headerName: "Povez", sort: true, dropdown: true, dataKey: "name" }];

export default function Povez() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookbinds, setBookbinds] = useState([]);
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
    setBookbinds(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setBookbinds(searchData);
    } else {
      setBookbinds(fetchedData);
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
  const bookbindsToDisplay = bookbinds.slice(startIndex, endIndex);
  const pageCount = Math.ceil(bookbinds.length / itemsPerPage);
  
  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"povez"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi povez"
          tableData={bookbindsToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Izmijeni povez",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi povez",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          itemsPerPageHandler={itemPerPageHandler}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const BookbindsLoader = async () => {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.bookbinds;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
