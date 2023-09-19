import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import { useDispatch, useSelector} from "react-redux";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import api from "../../api/apiCalls";
import { filterSearchedData } from "../../redux/actions";

import {
  FaCalendar,
  FaEdit,
  FaHandScissors,
  FaLevelUpAlt,
  FaRedo,
  FaRegFile,
  FaTrash,
} from "react-icons/fa";
import { transformBookData } from "../../util/Functions";

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Autor", sort: false, dropdown: false, dataKey: "author" },
  { headerName: "Kategorija", sort: false, dropdown: false, dataKey: "category" },
  { headerName: "Na raspolaganju",sort: false,dropdown: false,dataKey: "available" },
  { headerName: "Rezervisano", sort: false, dropdown: false, dataKey: "reserved" },
  { headerName: "Izdato", sort: false, dropdown: false, dataKey: "rented" },
  { headerName: "U prekoračenju", sort: false, dropdown: false, dataKey: "excess" },
  { headerName: "Ukupna količina", sort: false, dropdown: true, dataKey: "total" }
];

export default function Books() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    if(fetchedData){
      setBooks(transformBookData(fetchedData));
      setSearchBooks(transformBookData(fetchedData))
    }
  }, []);

  useEffect(() => {
    if (search.length > 0 ) {
      setBooks(searchData);
    }  else {
      setBooks(transformBookData(fetchedData))
    }
  }, [search, fetchedData]);

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(filterSearchedData(searchBooks, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    dispatch(filterSearchedData(searchBooks, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksToDisplay = books.slice(startIndex, endIndex);
  const pageCount = Math.ceil(books.length / itemsPerPage);


  const handleClick = () => {
    navigate("/books/new/osnovni-detalji");
  };
  return (
    <>
      <PageTitle title="Knjige" />
      <div className="page-wrapper">
        <TableControl
          title="Nova knjiga"
          onClick={handleClick}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          path="/books"
          headers={headers}
          tableData={booksToDisplay}
          searchColumn={handleColumnSearch}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaRegFile />,
              path: "",
            },
            {
              text: "Izmijeni knjigu",
              icon: <FaEdit />,
              path: "edit",
            },
            {
              text: "Otpisi knjigu",
              icon: <FaLevelUpAlt />,
              path: "otpisi-knjigu",
            },
            {
              text: "Izdaj knjigu",
              icon: <FaHandScissors />,
              path: "izdaj-knjigu",
            },
            {
              text: "Vrati knjigu",
              icon: <FaRedo />,
              path: "vrati-knjigu",
            },
            {
              text: "Rezervisi knjigu",
              icon: <FaCalendar />,
              path: "rezervisi-knjigu",
            },
            {
              text: "Izbrisi knjigu",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {books.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </>
  );
}

export const BooksLoader = async () => {
  try {
    const response = await api.get(`/books`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
