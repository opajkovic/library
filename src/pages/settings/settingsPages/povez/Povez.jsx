import React, { useEffect, useState} from "react";
import "./povez.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [{ headerName: "Povez", sort: true, dropdown: true, dataKey: "name" }];

export default function Povez() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const bookbindsData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const bookbindsToDisplay = bookbindsData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(bookbindsData.length / itemsPerPage);

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

      <Menu selectedSettings={"povez"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi povez"
          tableData={bookbindsToDisplay}
          headers={headers}
          options={[
            {
              text: "Izmijeni povez",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi povez",
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

export const BookbindsLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.bookbinds;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
