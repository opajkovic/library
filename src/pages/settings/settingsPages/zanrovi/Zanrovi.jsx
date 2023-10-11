import PageTitle from "../../../../components/pageTitle/PageTitle";
import Menu from "../../layouts/menu/Menu";
import SettingsTable from "../../components/SettingsTable";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../../../../api/apiCalls";
import { auth } from "../../../../services/AuthService";
import { useSettingsData } from "../../../../hooks/useSettings";
import "./zanrovi.css";

const headers = [
  { headerName: "Zanr", sort: true, dropdown: true, dataKey: "name" },
];

export default function Zanrovi() {
  const {
    dataToDisplay: genresToDisplay,
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

      <Menu selectedSettings={"zanrovi"} />
      <div className="page-wrapper">
        <SettingsTable
          title="Novi žanr"
          tableData={genresToDisplay}
          headers={headers}
          searchGlobal={handleGlobalSearch}
          searchColumn={searchColumn}
          options={[
            {
              text: "Izmijeni zanr",
              icon: <FaEdit />,
              path: "",
            },
            {
              text: "Izbrisi zanr",
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

export const GenresLoader = async () => {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/create`);
      const responseData = response.data.data.genres;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  }else{
    return []
  }
};
