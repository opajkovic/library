import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { deleteStudent } from "../../redux/actions";
import api from "../../api/apiCalls";
import { updateStudentsData } from "../../redux/student-data";
import { auth } from "../../services/AuthService";
import { useSidebarData } from "../../hooks/useSidebarData";

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

export default function Students() {
  const {
    dataToDisplay: studentsToDisplay,
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
    "students",
    deleteStudent,
    updateStudentsData,
    "/students/new",
    false
  );

  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl
          title="Novi ucenik"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          searchGlobal={handleGlobalSearch}
        />
        <Table
          path="/students"
          headers={headers}
          tableData={studentsToDisplay}
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
    </>
  );
}

export async function LoaderStudents() {
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/users`);
      const responseData = response.data.data;
      let listOfStudents = [];

      responseData.forEach((element) => {
        if (element.role === "Učenik") {
          listOfStudents = [...listOfStudents, element];
        }
      });
      return listOfStudents;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
}
