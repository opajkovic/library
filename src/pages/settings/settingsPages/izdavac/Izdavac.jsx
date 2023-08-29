import React, { useEffect } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";

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
      <div className="pageTableWrapper">

      <Menu selectedSettings={"izdavac"} />
      <SettingsTable
        title="Novi izdavač"
        mainHeader="Izdavač"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
      />
      </div>
    </div>
  );
}
