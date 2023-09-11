import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { filterSearchedData } from "../../redux/actions";
import api from "../../api/apiCalls";

const headers = [
  { headerName: "Ime i prezime", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "email", sort: false, dropdown: false, dataKey: "email" },
  { headerName: "role", sort: false, dropdown: false, dataKey: "role" },
  { headerName: "Username", sort: false, dropdown: true, dataKey: "username" },
];

export default function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const fetchedData = useLoaderData();
  const searchData = useSelector((state) => state.search.searchData);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setStudents(fetchedData);
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setStudents(searchData);
    } else {
      setStudents(fetchedData);
    }
  }, [search, fetchedData]);

  const handleClick = () => {
    navigate("/students/new");
  };

  const handleGlobalSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headers, searchValue));
  };

  const handleColumnSearch = (headerName, searchValue) => {
    setSearch(searchValue);
    dispatch(filterSearchedData(fetchedData, headerName, searchValue));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const studentsToDisplay = students.slice(startIndex, endIndex);
  const pageCount = Math.ceil(students.length / itemsPerPage);
+
console.log(fetchedData)
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
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: ""
            },
            {
              text: "Izmijeni korisnika",
              icon: <FaEdit />,
              path: "edit"
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
