import React, { useEffect } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Arto",
  },
  {
    id: 2,
    name: "Balbelo",
  },
  {
    id: 3,
    name: "Cid",
  },
  {
    id: 4,
    name: "Cosmo",
  },
];

export default function Izdavac() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"izdavac"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi izdavač"
          mainHeader="Izdavač"
          tableData={DUMMY_DATA}
          headers=""
          lastHeader=""
          options={[
            {
              text: "Izmijeni izdavaca",
              icon: <FaEdit />,
              path: ""
            },
            {
              text: "Izbrisi izdavaca",
              icon: <FaTrash />,
              path: ""
            },
          ]}
        />
      </div>
    </div>
  );
}
