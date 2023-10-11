import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import api from "../../api/apiCalls";
import { deleteBook } from "../../redux/actions";
import {
  FaCalendar,
  FaEdit,
  FaHandScissors,
  FaLevelUpAlt,
  FaRedo,
  FaRegFile,
  FaTrash,
} from "react-icons/fa";
import { updateBooksData } from "../../redux/books-data";
import "./Books.css";
import { auth } from "../../services/AuthService";
import { useSidebarData } from "../../hooks/useSidebarData";

const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: "name" },
  {
    headerName: "Autor",
    sort: false,
    dropdown: false,
    dataKey: "author",
    path: "/authors/:id",
    pathId: "autor",
  },
  {
    headerName: "Kategorija",
    sort: false,
    dropdown: false,
    dataKey: "category",
  },
  {
    headerName: "Na raspolaganju",
    sort: false,
    dropdown: false,
    dataKey: "available",
  },
  {
    headerName: "Rezervisano",
    sort: false,
    dropdown: false,
    dataKey: "reserved",
  },
  { headerName: "Izdato", sort: false, dropdown: false, dataKey: "rented" },
  {
    headerName: "U prekoračenju",
    sort: false,
    dropdown: false,
    dataKey: "excess",
  },
  {
    headerName: "Ukupna količina",
    sort: false,
    dropdown: true,
    dataKey: "total",
  },
];

export default function Books() {
  const {
    dataToDisplay: booksToDisplay,
    pageCount,
    handlePageClick,
    itemPerPageHandler,
    handleGlobalSearch,
    handleSort,
    handleClick,
    handleDelete,
    handleColumnSearch,
  } = useSidebarData(
    headers,
    "books",
    deleteBook,
    updateBooksData,
    "/books/new/osnovni-detalji"
  );

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
          handleDelete={handleDelete}
          handleSort={handleSort}
          tableClassName="books-modal"
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
        <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
      </div>
    </>
  );
}

export const BooksLoader = async () => {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
