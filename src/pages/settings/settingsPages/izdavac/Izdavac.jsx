import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { auth } from "../../../../services/AuthService";
import { useSettingsData } from "../../../../hooks/useSettings";
import "./izdavac.css";

const headers = [
  { headerName: "Izdavac", sort: true, dropdown: true, dataKey: "name" },
];

export default function Izdavac() {
  const {
    dataToDisplay: publishersToDisplay,
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
      <Menu selectedSettings={"izdavac"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi izdavač"
          tableData={publishersToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
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
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.publishers;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
