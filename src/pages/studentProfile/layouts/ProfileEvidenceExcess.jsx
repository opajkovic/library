import ProfileEvidence from "../components/ProfileEvidence";
import { auth } from "../../../services/AuthService";
import { LoaderRented } from "../../rentingBooks/rentingBooks";
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
    headerName: "Izdato učeniku",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
  },
  { headerName: "Datum izdavanja", sort: false, dropdown: false, dataKey: "borrow_date" },
  {
    headerName: "Prekoračenje u danima",
    sort: false,
    dropdown: false,
    dataKey: "",
  },
  {
    headerName: "Trenutno zadržavanje knjige",
    sort: false,
    dropdown: true,
    dataKey: "status",
  },
];

export default function ProfileEvidenceExcess() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData: excessedToDisplay,
    userInfo,
  } = useProfileEvidence(headers);

  return (
    <ProfileEvidence
      searchColumn={searchColumn}
      searchGlobal={searchGlobal}
      itemsPerPageHandler={itemsPerPageHandler}
      onPageChange={onPageChange}
      pageCount={pageCount}
      tableData={excessedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTest = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      return responseData.prekoracene.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
