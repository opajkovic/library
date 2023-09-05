import { useEffect } from "react";
import "./format.css";
import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [{ headerName: "Format", sort: true, dropdown: true, dataKey:"name" }];

export default function Format() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const formatData = useLoaderData();
  
  useEffect(() => {
    setRoute("settings");
  }, []);

  const handleClick = () => {
    navigate("./new");
  };
  return (
    <div>
      <PageTitle title="Settings" />

      <Menu selectedSettings={"format"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi format"
          tableData={formatData}
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
              noPath: true
            },
          ]}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export const FormatLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.formats;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
