import PageTitle from "../../../components/pageTitle/PageTitle";
import BottomContainer from "../components/BottomContainer";
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
    headerName: "Izdato učeniku",
    sort: false,
    dropdown: false,
    dataKey: "student.name+student.surname",
    path: "/students/:id",
    pathId: "student",
  },
  {
    headerName: "Datum izdavanja",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Datum vraćanja",
    sort: false,
    dropdown: false,
    dataKey: "return_date",
  },
  {
    headerName: "Zadržavanje knjige",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Trenutno zadržavanje knjige",
    sort: false,
    dropdown: true,
    dataKey: "borrow_date",
  },
];

export default function ReturnedBooks() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData,
  } = useRenting(headers, "vracene");

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
