import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { useSettingsData } from "../../../../hooks/useSettings";
import { auth } from "../../../../services/AuthService";
import "./kategorije.css";

const headers = [
  { headerName: "Kategorije", sort: true, dropdown: true, dataKey: "name" },
];

export default function Kategorije() {
  const {
    dataToDisplay: categoriesToDisplay,
    pageCount,
    handlePageClick,
    itemPerPageHandler,
    handleGlobalSearch,
    searchColumn,
    handleClick,
  } = useSettingsData(headers);

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
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
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
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.categories;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
