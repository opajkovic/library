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
import { deleteAuthor, filterSearchedData } from "../../redux/actions";
import { updateAuthorsData } from "../../redux/authors-data";

const headers = [
  { headerName: "Ime autora", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Prezime autora", sort: false, dropdown: true,dataKey: "surname" }
];

export default function Authors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [updatedSearchData, setUpdatedSearchData] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const authorData = useSelector((state) => state.authors);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    dispatch(updateAuthorsData(fetchedData));
    setAuthors(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0 && updatedSearchData === null) {
      setAuthors(searchData);
    } else if ( updatedSearchData !== null ) {
      setAuthors(updatedSearchData);
    } else {
      setAuthors(authorData)
    }
  }, [search, searchData, updatedSearchData, authorData]);

  const handleClick = () => {
    navigate("/authors/new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(filterSearchedData(authorData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    dispatch(filterSearchedData(authorData, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const authorsToDisplay = authors.slice(startIndex, endIndex);
  const pageCount = Math.ceil(authors.length / itemsPerPage);

  const handleDelete = async (id) => {
    api.delete(`/authors/${id}`);
    dispatch(deleteAuthor(authorData, id));
    setUpdatedSearchData(searchData.filter((item) => item.id !== id));
    navigate("/authors");
  };

  return (
    <>
      <PageTitle title="Autori" />
      <div className="page-wrapper">
        <TableControl
          title="Novi autor"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          className="authors-table"
          path="/authors"
          tableData={authorsToDisplay}
          headers={headers}
          searchColumn={handleColumnSearch}
          handleDelete={handleDelete}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "",
            },
            {
              text: "Izmijeni autora",
              icon: <FaEdit />,
              path: "edit",
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
