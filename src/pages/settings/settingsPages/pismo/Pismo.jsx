import React, { useEffect } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [{ headerName: "Pismo", sort: true, dropdown: true }];

export default function Pismo() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const languagesData = useLoaderData();
  const languages = languagesData.map((item) => item.name);
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
          title="Novo pismo"
          tableData={languages}
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
