import React, { useEffect } from "react";
import "./format.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Format: "A3",
  },
  {
    id: 2,
    Format: "A4",
  },
  {
    id: 3,
    Format: "B4",
  },
  {
    id: 4,
    Format: "A6",
  },
];

const headers = [{ headerName: "Format", sort: true, dropdown: true }];

export default function Format() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"format"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi format"
          tableData={DUMMY_DATA}
          headers={headers}
          options={[
            {
              text: "Izmijeni format",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi format",
              icon: <FaTrash />,
              path: "",
            },
          ]}
        />
      </div>
    </div>
  );
}
