import { useEffect } from "react";
import "./zanrovi.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Zanr: "Autobiografija",
  },
  {
    id: 2,
    Zanr: "Enciklopedija",
  },
  {
    id: 3,
    Zanr: "Fantazija",
  },
  {
    id: 4,
    Zanr: "Komedija",
  },
];

const headers = [{ headerName: "Zanr", sort: true, dropdown: true }];

export default function Zanrovi() {
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

      <Menu selectedSettings={"zanrovi"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi žanr"
          tableData={DUMMY_DATA}
          headers={headers}
          options={[
            {
              text: "Izmijeni zanr",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi zanr",
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
