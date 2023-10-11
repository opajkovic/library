import ProfileEvidence from "../components/ProfileEvidence";
import { auth } from "../../../services/AuthService";
import { LoaderRented } from "../../rentingBooks/rentingBooks";
import { useProfileEvidence } from "../../../hooks/useProfileEvidence";

const headers = [
  {
    headerName: "Naziv knjige",
    sort: true,
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
  {
    headerName: "Datum izdavanja",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Trenutno zadržavanje knjiga",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Knjigu izdao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar0.name+bibliotekar0.surname",
    path: "/librarians/:id",
    pathId: "bibliotekar",
  },
];

export default function ProfileEvidenceRented() {

  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData: rentedToDisplay,
    userInfo,
  } = useProfileEvidence(headers);

  return (
    <ProfileEvidence
      searchColumn={searchColumn}
      searchGlobal={searchGlobal}
      itemsPerPageHandler={itemsPerPageHandler}
      onPageChange={onPageChange}
      pageCount={pageCount}
      tableData={rentedToDisplay}
      userInfo={userInfo}
      headers={headers}
    />
  );
}

export const loaderTestRented = async ({ params }) => {
  const id = params.id;
  const isAuthenticated = auth.getAuthStatus();
  if (isAuthenticated) {
    try {
      const responseData = await LoaderRented();
      return responseData.izdate.filter((el) => el.student.id == id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    return [];
  }
};
