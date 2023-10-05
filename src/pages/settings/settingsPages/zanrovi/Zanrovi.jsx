import { useEffect, useState } from "react";
import "./zanrovi.css";
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
  { headerName: "Zanr", sort: true, dropdown: true, dataKey: "name" },
];

export default function Zanrovi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);
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
    setGenres(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setGenres(searchData);
    } else {
      setGenres(fetchedData);
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
  const genresToDisplay = genres.slice(startIndex, endIndex);
  const pageCount = Math.ceil(genres.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"zanrovi"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi žanr"
          tableData={genresToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Izmijeni zanr",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi zanr",
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

export const GenresLoader = async () => {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.genres;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
