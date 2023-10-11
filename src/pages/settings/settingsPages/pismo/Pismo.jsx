import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { auth } from "../../../../services/AuthService";
import { useSettingsData } from "../../../../hooks/useSettings";
import "./pismo.css";

const headers = [
  { headerName: "Pismo", sort: true, dropdown: true, dataKey: "name" },
];

export default function Pismo() {
  const {
    dataToDisplay: languageToDisplay,
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

      <Menu selectedSettings={"pismo"} />
      <div className="page-wrapper">
        <SettingsTable
          itemsPerPageHandler={itemPerPageHandler}
          title="Novo pismo"
          tableData={languageToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
          options={[
            {
              text: "Izmijeni pismo",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi pismo",
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

export const LanguagesLoader = async () => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.languages;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
