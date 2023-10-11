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
  },
  {
    headerName: "Izdato učeniku",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
  },
  {
    headerName: "Datum izdavanja",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  { headerName: "Datum otpisivanja", sort: false, dropdown: false, dataKey:"action_date"},
  { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
  {
    headerName: "Knjigu otpisao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
];

export default function ProfileEvidenceWrittenOff() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData: writtenedOffToDisplay,
    userInfo,
  } = useProfileEvidence(headers);

  return (
    <ProfileEvidence
      searchColumn={searchColumn}
      searchGlobal={searchGlobal}
      itemsPerPageHandler={itemsPerPageHandler}
      onPageChange={onPageChange}
      pageCount={pageCount}
      tableData={writtenedOffToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestWrittenOff = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      return responseData.otpisane.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
