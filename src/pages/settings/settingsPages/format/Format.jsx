import Menu from "../../layouts/menu/Menu";
import PageTitle from "../../../../components/pageTitle/PageTitle";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { auth } from "../../../../services/AuthService";
import { useSettingsData } from "../../../../hooks/useSettings";
import "./format.css";

const headers = [
  { headerName: "Format", sort: true, dropdown: true, dataKey: "name" },
];

export default function Format() {
  const {
    dataToDisplay: formatToDisplay,
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

      <Menu selectedSettings={"format"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi format"
          tableData={formatToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
          options={[
            {
              text: "Izmijeni format",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi format",
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

export const FormatLoader = async () => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.formats;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
