import { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import api from "../../api/apiCalls";

import {
  FaCalendar,
  FaEdit,
  FaHandScissors,
  FaLevelUpAlt,
  FaRedo,
  FaRegFile,
  FaTrash,
} from "react-icons/fa";

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
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const fetchedData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const booksToDisplay = books.slice(startIndex, endIndex);
  const pageCount = Math.ceil(books.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setBooks(
      fetchedData.map((item) => ({
        id: item.id,
        name: item.title,
        author: item.authors[0].name + " " + item.authors[0].surname,
        category: item.categories[0].name,
        available: item.samples,
        reserved: item.rSamples,
        rented: item.bSamples,
        excess: item.fSamples,
        total: item.samples,
      }))
    );
  }, []);

  console.log(books)

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
        />
        <Table
          path="/books"
          headers={headers}
          tableData={booksToDisplay}
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
