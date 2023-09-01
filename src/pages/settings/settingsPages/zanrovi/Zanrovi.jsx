import { useEffect } from "react";
import "./zanrovi.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Autobiografija",
  },
  {
    id: 2,
    name: "Enciklopedija",
  },
  {
    id: 3,
    name: "Fantazija",
  },
  {
    id: 4,
    name: "Komedija",
  },
];

export default function Zanrovi() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("settings");
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"zanrovi"} />
      <div className="page-wrapper">
      <SettingsTable
        title="Novi žanr"
        mainHeader="Žanr"
        tableData={DUMMY_DATA}
        headers=""
        lastHeader=""
        options={[
          {
            text: "Izmijeni zanr",
            icon: <FaEdit />,
            path: ""
          },
          {
            text: "Izbrisi zanr",
            icon: <FaTrash />,
            path: ""
          },
        ]}
      />
      </div>
    </div>
  );
}
