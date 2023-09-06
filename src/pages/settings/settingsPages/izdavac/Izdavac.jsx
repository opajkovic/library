import { useEffect, useState } from "react";
import "./izdavac.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [
  { headerName: "Izdavac", sort: true, dropdown: true, dataKey: "name" },
];

export default function Izdavac() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const publisherData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const publisherToDisplay = publisherData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(publisherData.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const itemPerPageHandler = (value) => {
    setItemsPerPage(value);
  };

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
          tableData={publisherToDisplay}
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
              noPath: true,
            },
          ]}
          onClick={handleClick}
          itemsPerPageHandler={itemPerPageHandler}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const PublisherLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.publishers;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
