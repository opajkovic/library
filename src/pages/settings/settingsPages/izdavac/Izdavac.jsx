import { useEffect } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";

const DUMMY_DATA = [
  {
    id: 1,
    Izdavac: "Arto",
  },
  {
    id: 2,
    Izdavac: "Balbelo",
  },
  {
    id: 3,
    Izdavac: "Cid",
  },
  {
    id: 4,
    Izdavac: "Cosmo",
  },
];

const headers = [{ headerName: "Izdavac", sort: true, dropdown: true }];

export default function Izdavac() {
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

      <Menu selectedSettings={"izdavac"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi izdavač"
          tableData={DUMMY_DATA}
          headers={headers}
          options={[
            {
              text: "Izmijeni izdavaca",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi izdavaca",
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
