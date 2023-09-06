import React, { useEffect, useState } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [
  { headerName: "Pismo", sort: true, dropdown: true, dataKey: "name" },
];

export default function Pismo() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const languagesData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const languagesToDisplay = languagesData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(languagesData.length / itemsPerPage);

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

      <Menu selectedSettings={"pismo"} />
      <div className="page-wrapper">
        <SettingsTable
          itemsPerPageHandler={itemPerPageHandler}
          title="Novo pismo"
          tableData={languagesToDisplay}
          headers={headers}
          options={[
            {
              text: "Izmijeni pismo",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi pismo",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const LanguagesLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.languages;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
