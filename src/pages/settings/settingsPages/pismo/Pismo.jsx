import React, { useEffect, useState } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchedData } from "../../../../redux/actions";
import { auth } from "../../../../services/AuthService";

const headers = [
  { headerName: "Pismo", sort: true, dropdown: true, dataKey: "name" },
];

export default function Pismo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [language, setLanguage] = useState([]);
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
    setLanguage(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setLanguage(searchData);
    } else {
      setLanguage(fetchedData);
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
  const languageToDisplay = language.slice(startIndex, endIndex);
  const pageCount = Math.ceil(language.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"pismo"} />
      <div className="page-wrapper">
        <SettingsTable
          itemsPerPageHandler={itemPerPageHandler}
          title="Novo pismo"
          tableData={languageToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Izmijeni pismo",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi pismo",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const LanguagesLoader = async () => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.languages;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
