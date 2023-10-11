import PageTitle from "../../../components/pageTitle/PageTitle";
import BottomContainer from "../components/BottomContainer";
import api from "../../../api/apiCalls";
import { auth } from "../../../services/AuthService";
import { useRenting } from "../../../hooks/useRenting";
import "../rentingBooks.css";

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
    dataKey: "action_date",
  },
  {
    headerName: "Rezervacija ističe",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Rezervaciju podnio",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
    path: "/students/:id",
    pathId: "student",
  },
  { headerName: "Status", sort: false, dropdown: true, dataKey: "status" },
];

export default function ActiveReservations() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData,
  } = useRenting(headers, "active");

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer
        searchColumn={searchColumn}
        searchGlobal={searchGlobal}
        itemsPerPageHandler={itemsPerPageHandler}
        onPageChange={onPageChange}
        pageCount={pageCount}
        tableData={tableData}
        headers={headers}
      />
    </div>
  );
}

export async function LoaderReservations() {
  const isAuthenticated = auth.bibliotekarRole();
  if (isAuthenticated) {
    try {
      const response = await api.get(`/books/reservations`);
      const responseData = response.data.data;
      return responseData;
    } catch (error) {
      console.error("Loader function error:", error);
      throw error;
    }
  } else {
    return [];
  }
}
