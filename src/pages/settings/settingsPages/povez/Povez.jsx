import React, { useEffect } from "react";
import "./povez.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Povez: "Kožni",
  },
  {
    id: 2,
    Povez: "Meki",
  },
  {
    id: 3,
    Povez: "Poluplatneni",
  },
  {
    id: 4,
    Povez: "Tvrdi",
  },
];

const headers = [{ headerName: "Povez", sort: true, dropdown: true }];

export default function Povez() {
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

      <Menu selectedSettings={"povez"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi povez"
          tableData={DUMMY_DATA}
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
              noPath: true
            },
          ]}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
