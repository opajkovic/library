import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
import { deleteAuthor } from "../../redux/actions";
import { updateAuthorsData } from "../../redux/authors-data";
import { auth } from "../../services/AuthService";
import { useSidebarData } from "../../hooks/useSidebarData";
import "./Author.css";

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
  const {
    dataToDisplay: authorsToDisplay,
    pageCount,
    handlePageClick,
    itemPerPageHandler,
    handleGlobalSearch,
    handleSort,
    handleClick,
    handleDelete,
    handleColumnSearch,
  } = useSidebarData(headers, "authors", deleteAuthor, updateAuthorsData, "/authors", false);

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
  } else {
    return [];
  }
}
