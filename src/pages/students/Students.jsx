import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  {
    headerName: "Poslednji pristup sistemu",
    sort: false,
    dropdown: true,
    dataKey: "lastOnline",
  },
];

export default function Students() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  let [students, setStudents] = useState([]);
  const fetchedData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = fetchedData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(fetchedData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setStudents(fetchedData);
    setRoute("students");
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    navigate("/students/new");
  };

  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl
          title="Novi ucenik"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
        />
        <Table
          path="/students"
          headers={headers}
          tableData={studentsToDisplay}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/students/",
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "/students/",
            },
            {
              text: "Izbrisi korisnika",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {students.length > 0 && (
          <Pagination onPageChange={handlePageClick} pageCount={pageCount} />
        )}
      </div>
    </>
  );
}

export async function LoaderStudents() {
  try {
    const response = await api.get(`/users`);
    const responseData = response.data.data;
    let listOfStudents = [];

    responseData.forEach((element) => {
      if (element.role === "Učenik") {
        listOfStudents = [...listOfStudents, element];
      }
    });

    // Now 'listOfStudents' contains the array of students.
    return listOfStudents;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
