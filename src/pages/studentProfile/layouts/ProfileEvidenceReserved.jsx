import ProfileEvidence from "../components/ProfileEvidence";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";
import { useProfileEvidence } from "../../../hooks/useProfileEvidence";

const headers = [
  {
    headerName: "Naziv knjige",
    sort: false,
    dropdown: false,
    dataKey: "knjiga.title",
    path: "/books/:id",
    pathId: "knjiga",
  },
  {
    headerName: "Datum rezervacije",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Rezervacija ističe",
    sort: false,
    dropdown: false,
    dataKey: "return_date",
  },
  {
    headerName: "Rezervaciju podnio",
    sort: false,
    dropdown: false,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
  { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
];

export default function ProfileEvidenceReserved() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData: reservedToDisplay,
    userInfo,
  } = useProfileEvidence(headers);

  return (
    <ProfileEvidence
      searchColumn={searchColumn}
      searchGlobal={searchGlobal}
      itemsPerPageHandler={itemsPerPageHandler}
      onPageChange={onPageChange}
      pageCount={pageCount}
      tableData={reservedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestActive = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      return responseData.active.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
};
