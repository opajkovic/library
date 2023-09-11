import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import "./librarians.css";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../redux/actions";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Username", sort: false, dropdown: true, dataKey: "username" },
];

const Librarians = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [librarians, setLibrarians] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const dispatchData = useSelector((state) => state.search.searchData);
  const searchData = dispatchData.searchData;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setLibrarians(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (searchData !== undefined) {
      setLibrarians(searchData.filter(item => item.role === "Bibliotekar"));
    }
  }, [searchData]);

  useEffect(() => {
    dispatch(fetchSearchData(headers, search, "/users"));
  }, [dispatch]);

  const handleClick = () => {
    navigate("/librarians/new");
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(fetchSearchData(headers, searchValue, "/users"));
  };

  const handleLowerSearchInputs = (headerName, searchValue) => {
    dispatch(fetchSearchData(headerName, searchValue, "/users"));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const librariansToDisplay = librarians.slice(startIndex, endIndex);
  const pageCount = Math.ceil(librarians.length / itemsPerPage);

  return (
    <div>
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">
        <TableControl
          title="Novi bibliotekar"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          search={handleSearchInputChange}
        />
        <Table
          path="/librarians"
          headers={headers}
          tableData={librariansToDisplay}
          handleSearchInputChange={handleLowerSearchInputs}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/librarians/",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/librarians/",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {librarians.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </div>
  );
};

export default Librarians;

export async function LoaderLibrarians() {
  try {
    const response = await api.get(`/users`);
    const responseData = response.data.data;
    const listOfBibliotekars = responseData.filter(
      (item) => item.role === "Bibliotekar"
    );
    return listOfBibliotekars;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
