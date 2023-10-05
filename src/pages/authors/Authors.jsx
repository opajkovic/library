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
import { sortedData } from "../../redux/sort-data";
import { sortData } from "../../redux/actions";
import { toast } from "react-toastify";
import { auth } from "../../services/AuthService";

const headers = [
  { headerName: "Ime autora", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Prezime autora", sort: false, dropdown: true, dataKey: "surname" }
];

export default function Authors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [resetPagination, setResetPagination] = useState(false);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);
  const updatedSortedData = useSelector((state) => state.sort.sortedData);
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
    dispatch(sortedData(fetchedData))
  }, []);

  useEffect(() => {
    if(search !== "") {
      setAuthors(searchData);
      if (resetPagination) {
        setCurrentPage(0);
        setResetPagination(false);
      }
    }
    else {
      if(authorData !== null){
        setAuthors(authorData)
      }
    }
  }, [search]);

  const handleClick = () => {
    navigate("/authors/new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(authorData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    setResetPagination(true);
    dispatch(filterSearchedData(authorData, headerName, searchValue));
  };

  const handleSort = () => {
    dispatch(sortData(authors))
  }

  useEffect(()=>{
    setAuthors(updatedSortedData)
  },[updatedSortedData])

  const handleDelete = async (id) => {
      try {
        const response = await api.delete(`/authors/${id}`);
        const data = response.data;
        toast.success("Izbrisan autor");
        dispatch(deleteAuthor(authorData, id));
        if (search !== "") {
          setAuthors(searchData.filter((item) => item.id !== id));
        } else {
          setAuthors(authorData.filter((item) => item.id !== id));
        }
      } catch (err) {
        toast.error("message: " + err.response.data.message + " , data: " + err.response.data.data);
      }
    
     
    // navigate("/authors");
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
          searchGlobal={handleGlobalSearch}
        />
        <Table
          className="authors-table"
          path="/authors"
          tableData={authorsToDisplay}
          headers={headers}
          searchColumn={handleColumnSearch}
          handleDelete={handleDelete}
          handleSort={handleSort}
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
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/authors`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
}
