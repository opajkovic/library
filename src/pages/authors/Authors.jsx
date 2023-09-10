import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
import "./Author.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../redux/actions";

const headers = [
  { headerName: "Ime autora", sort: true, dropdown: false, dataKey: "name" },
  {
    headerName: "Prezime autora",
    sort: false,
    dropdown: true,
    dataKey: "surname",
  },
];

export default function Authors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const dispatchData = useSelector((state) => state.search.searchData);
  const searchData = dispatchData.searchData;
  console.log(searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setAuthors(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (searchData !== undefined) {
      setAuthors(searchData);
    }
  }, [searchData]);

  useEffect(() => {
    dispatch(fetchSearchData(headers, search, "/authors"));
  }, [dispatch]);

  const handleClick = () => {
    navigate("/authors/new");
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(fetchSearchData(headers, searchValue, "/authors"));
  };

  const handleLowerSearchInputs = (headerName, searchValue) => {
    dispatch(fetchSearchData(headerName, searchValue, "/authors"));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const authorsToDisplay = authors.slice(startIndex, endIndex);
  const pageCount = Math.ceil(authors.length / itemsPerPage);

  return (
    <>
      <PageTitle title="Autori" />
      <div className="page-wrapper">
        <TableControl
          title="Novi autor"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          search={handleSearchInputChange}
        />
        <Table
          className="authors-table"
          path="/authors"
          tableData={authorsToDisplay}
          headers={headers}
          handleSearchInputChange={handleLowerSearchInputs}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/authors/",
            },
            {
              text: "Izmijeni autora",
              icon: <FaEdit />,
              path: "/authors/",
            },
            {
              text: "Izbrisi autora",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
      </div>
    </>
  );
}
export async function LoaderAuthors() {
  try {
    const response = await api.get(`/authors`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
