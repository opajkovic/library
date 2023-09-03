import React, { useEffect } from "react";
import "./pismo.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Pismo: "Ćirlica",
  },
  {
    id: 2,
    Pismo: "Latinica",
  },
];

const headers = [{ headerName: "Pismo", sort: true, dropdown: true }];

export default function Pismo() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
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
          tableData={DUMMY_DATA}
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
              path: "",
            },
          ]}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
