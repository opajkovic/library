import React, { useEffect } from "react";
import "./format.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useOutletContext } from "react-router";
import Table from "../../../../components/UI/Table";
import TableControl from "../../../../components/UI/TableControl";
import SettingsTable from "../../components/SettingsTable";

const DUMMY_DATA = [
  {
    id: 1,
    name: "A3",
  },
  {
    id: 2,
    name: "A4",
  },
  {
    id: 3,
    name: "B4",
  },
  {
    id: 4,
    name: "A6",
  },
];

export default function Format() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Menu selectedSettings={"format"} />
      <SettingsTable
        title="Novi format"
        mainHeader="Format"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
      />
    </div>
  );
}
