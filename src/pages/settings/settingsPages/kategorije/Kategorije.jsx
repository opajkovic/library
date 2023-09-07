import "./kategorije.css";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import { useOutletContext, useNavigate, useLoaderData } from "react-router";
import { useEffect, useState } from "react";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";

const headers = [
  { headerName: "Kategorije", sort: true, dropdown: false, dataKey: "name" },
];

export default function Kategorije() {
  const { setRoute } = useOutletContext();
  const navigate = useNavigate();
  const categoryData = useLoaderData();

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const categoriesToDisplay = categoryData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(categoryData.length / itemsPerPage);

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

      <Menu selectedSettings={"kategorije"} />
      <div className="page-wrapper">
        <SettingsTable
          itemsPerPageHandler={itemPerPageHandler}
          title="Nova kategorija"
          headers={headers}
          tableData={categoriesToDisplay}
          options={[
            {
              text: "Izmijeni kategoriju",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi kategoriju",
              icon: <FaTrash />,
              noPath: true,
            },
          ]}
          onClick={handleClick}
          onPageChange={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}

export const CategoryLoader = async () => {
  try {
    const response = await api.get(`/books/create`);
    const responseData = response.data.data.categories;
    return responseData;
  } catch (error) {
    console.error("Loader function error:", error);
    throw error;
  }
};
