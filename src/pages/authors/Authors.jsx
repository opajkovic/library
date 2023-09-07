import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";
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
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  let [authors, setAuthors] = useState([]);
  const fetchedData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const authorsToDisplay = fetchedData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(fetchedData.length / itemsPerPage);
  
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value)
  }

  useEffect(() => {
    setAuthors(fetchedData);
    setRoute("authors");
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    navigate("/authors/new");
  };
  return (
    <>
      <PageTitle title="Autori" />
      <div className="page-wrapper">
        <TableControl title="Novi autor" onClick={() => handleClick()} itemsPerPageHandler={itemPerPageHandler}/>
        <Table
          className="authors-table"
          path="/authors"
          tableData={authorsToDisplay}
          headers={headers}
          options={[
            {
              text: "Pogledaj detalje",
              icon: <FaFile />,
              path: "/authors/",
            },
            {
              text: "Izmijeni autora",
              icon: <FaEdit />,
              path: "/authors/",
            },
            {
              text: "Izbrisi autora",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
        />
        {authors.length > 0 && (
          <Pagination
            onPageChange={handlePageClick}
            pageCount={pageCount}
          />
        )}
      </div>
    </>
  );
}
export async function LoaderAuthors() {
  try {
    const response = await api.get(`/authors`);
    const responseData = response.data.data;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
}
