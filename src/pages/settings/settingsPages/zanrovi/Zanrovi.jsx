import { useEffect, useState } from "react";
import "./zanrovi.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [
  { headerName: "Zanr", sort: true, dropdown: true, dataKey: "name" },
];

export default function Zanrovi() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const genresData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const genresToDisplay = genresData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(genresData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

  useEffect(() => {
    setRoute("settings");
  }, []);

  const handleClick = () => {
    navigate("./new");
  };

  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"zanrovi"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi žanr"
          tableData={genresToDisplay}
          headers={headers}
          options={[
            {
              text: "Izmijeni zanr",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi zanr",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          itemsPerPageHandler={itemPerPageHandler}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const GenresLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.genres;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
