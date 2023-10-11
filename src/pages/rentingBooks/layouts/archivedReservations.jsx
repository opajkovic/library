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
    headerName: "Datum rezervacije",
    sort: false,
    dropdown: false,
    dataKey: "action_date",
  },
  {
    headerName: "Rezervacija zatvorena",
    sort: false,
    dropdown: false,
    dataKey: "status",
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

export default function ArchivedarchivedBookss() {
  const {
    searchColumn,
    searchGlobal,
    itemsPerPageHandler,
    onPageChange,
    pageCount,
    tableData,
  } = useRenting(headers, "archive");

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
