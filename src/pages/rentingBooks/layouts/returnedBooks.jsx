import PageTitle from "../../../components/pageTitle/PageTitle";
import "../rentingBooks.css";
import BottomContainer from "../components/BottomContainer";

export default function ReturnedBooks() {

  const headers = [
    { headerName: "Naziv knjige", sort: false, dropdown: false },
    { headerName: "Izdato učeniku", sort: false, dropdown: false },
    { headerName: "Datum izdavanja", sort: false, dropdown: false },
    { headerName: "Datum vraćanja", sort: false, dropdown: false },
    { headerName: "Zadržavanje knjige", sort: false, dropdown: false },
    { headerName: "Trenutno zadržavanje knjige", sort: false, dropdown: true },
  ];

  return (
    <div>
      <PageTitle title="Izdavanje Knjiga" />
      <BottomContainer title="Nova knjiga" headers={headers} />
    </div>
  );
}
