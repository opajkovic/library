import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import PageTitle from "../../components/pageTitle/PageTitle";
import Table from "../../components/UI/Table";
import TableControl from "../../components/UI/TableControl";
import Pagination from "../../components/UI/Pagination";
import { FaEdit, FaFile, FaTrash } from "react-icons/fa";
import api from "../../api/apiCalls";


const headers = [
  { headerName: "Naziv knjige", sort: true, dropdown: false, dataKey: "name" },
  { headerName: "Opis", sort: false, dropdown: true, dataKey: "description" },
];

export default function Authors() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  let [authors, setAuthors] = useState([])
  const fetchedData = useLoaderData();

  useEffect(() => {
    setAuthors(fetchedData)
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
        <TableControl title="Novi autor" onClick={() => handleClick()} />
        <Table
          path="/authors"
          tableData={authors}
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
        <Pagination items={authors} />
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