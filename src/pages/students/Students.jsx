import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchData } from "../../redux/actions";
import api from "../../api/apiCalls";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Username", sort: false, dropdown: true, dataKey: "username"},
];

export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const dispatchData = useSelector((state) => state.search.searchData);
  const searchData = dispatchData.searchData;

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setStudents(fetchedData);
  }, [fetchedData]);

  useEffect(() => {
    if (searchData !== undefined) {
      setStudents(searchData.filter(item => item.role === "Učenik"));
    }
  }, [searchData]);

  useEffect(() => {
    dispatch(fetchSearchData(headers, search, "/users"));
  }, [dispatch]);

  const handleClick = () => {
    navigate("/students/new");
  };

  const handleSearchInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(fetchSearchData(headers, searchValue, "/users"));
  };

  const handleLowerSearchInputs = (headerName, searchValue) => {
    dispatch(fetchSearchData(headerName, searchValue, "/users"));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = students.slice(startIndex, endIndex);
  const pageCount = Math.ceil(students.length / itemsPerPage);

  return (
    <>
      <PageTitle title="Učenici" />
      <div className="page-wrapper">
        <TableControl
          title="Novi ucenik"
          onClick={() => handleClick()}
          itemsPerPageHandler={itemPerPageHandler}
          search={handleSearchInputChange}
        />
        <Table
          path="/students"
          headers={headers}
          tableData={studentsToDisplay}
          handleSearchInputChange={handleLowerSearchInputs}
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
