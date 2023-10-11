import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { auth } from "../../../../services/AuthService";
import { useSettingsData } from "../../../../hooks/useSettings";
import "./povez.css";

const headers = [
  { headerName: "Povez", sort: true, dropdown: true, dataKey: "name" },
];

export default function Povez() {
  const {
    dataToDisplay: bookbindsToDisplay,
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

      <Menu selectedSettings={"povez"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi povez"
          tableData={bookbindsToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
          options={[
            {
              text: "Izmijeni povez",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi povez",
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

export const BookbindsLoader = async () => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.bookbinds;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
