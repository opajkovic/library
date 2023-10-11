import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
import { deleteLibrarian } from "../../redux/actions";
import { updateLibrariansData } from "../../redux/librarian-data";
import { auth } from "../../services/AuthService";
import { useSidebarData } from "../../hooks/useSidebarData";
import "./librarians.css";

const headers = [
  {
    headerName: "Ime i prezime",
    sort: true,
    dropdown: false,
    dataKey: "name+surname",
  },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Username", sort: false, dropdown: true, dataKey: "username" },
];

const Librarians = () => {
  const {
    dataToDisplay: librariansToDisplay,
    pageCount,
    handlePageClick,
    itemPerPageHandler,
    handleGlobalSearch,
    handleSort,
    handleClick,
    handleDelete,
    handleColumnSearch,
  } = useSidebarData(headers, "librarians", deleteLibrarian, updateLibrariansData, "/librarians");

  return (
    <div>
      <PageTitle title="Bibliotekari" />
      <div className="page-wrapper">
        <TableControl
          title="Novi bibliotekar"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          path="/librarians"
          headers={headers}
          tableData={librariansToDisplay}
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
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "edit",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default Librarians;

export async function LoaderLibrarians() {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
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
  } else {
    return [];
  }
}
