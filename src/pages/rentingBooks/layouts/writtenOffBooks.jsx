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
    dataKey: "bibliotekar1.name+bibliotekar1.surname",
  },
  {
    headerName: "Datum otpisivanja",
    sort: false,
    dropdown: false,
    dataKey: "action_date",
  },
  {
    headerName: "Zadržavanje knjige",
    sort: false,
    dropdown: false,
    dataKey: "borrow_date",
  },
  {
    headerName: "Knjigu otpisao",
    sort: false,
    dropdown: true,
    dataKey: "bibliotekar1.name+bibliotekar1.surname",
  },
];

export default function WrittenOffBooks() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData,
  } = useRenting(headers, "otpisane");

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
