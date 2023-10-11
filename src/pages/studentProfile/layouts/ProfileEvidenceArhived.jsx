import ProfileEvidence from "../components/ProfileEvidence";
import { auth } from "../../../services/AuthService";
import { reservationLoader } from "../../dashboard/Dashboard";
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
    headerName: "Rezervacija zatvorena",
    sort: false,
    dropdown: false,
    dataKey: "",
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

export default function ProfileEvidenceArchived() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData: archivedToDisplay,
    userInfo,
  } = useProfileEvidence(headers);

  return (
    <ProfileEvidence
      searchColumn={searchColumn}
      searchGlobal={searchGlobal}
      itemsPerPageHandler={itemsPerPageHandler}
      onPageChange={onPageChange}
      pageCount={pageCount}
      tableData={archivedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestArchived = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await reservationLoader();
      return responseData.archive.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
